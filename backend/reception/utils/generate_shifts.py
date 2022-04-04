from pulp import LpInteger, LpMaximize, LpProblem, LpVariable, lpSum


def generate_shifts(num_members, num_shifts, num_days, start_day):
    all_members = range(num_members)
    all_shifts = range(1, num_shifts + 1)
    all_days = range(num_days)
    # List of all shifts that are forbidden
    # forbidden_shifts = [
    #     (d, s)
    #     for d in all_days
    #     for s in all_shifts
    #     if (((start_day + d) % 7) >= 0 and ((start_day + d) % 7) < 5) and s == 2
    # ]

    # List of all shifts considered bad
    bad_shifts = [(d, 1) for d in all_days if ((start_day + d) % 7) != 5]
    bad_shifts += [
        (d, s) for d in all_days for s in all_shifts if ((start_day + d) % 7) == 5
    ]
    bad_shifts += [(d, 2) for d in all_days if ((start_day + d) % 7) == 6]
    bad_shifts += [
        (d, s)
        for d in all_days
        for s in all_shifts
        if ((start_day + d) % 7) == 4 and (s == 3 or s == 4)
    ]

    shifts = LpVariable.dicts(
        "shifts", (all_members, all_days, all_shifts), 0, 1, LpInteger
    )
    members = LpVariable.dicts("members", (all_members), 0, None, LpInteger)
    member_boolean = LpVariable.dicts("member_boolean", (members), 0, 1, LpInteger)

    model = LpProblem("Scheduler", LpMaximize)
    model += lpSum(members[si] for si in all_members)

    # 4 shifts per day
    for d in all_days:
        model += lpSum(shifts[m][d][r] for m in all_members for r in all_shifts) == 4

    # Distribute num of all shifts evenly
    min_shift_per_member = (num_days * num_shifts) // num_members
    for n in all_members:
        model += (
            lpSum(shifts[n][d][s] for d in all_days for s in all_shifts)
            >= min_shift_per_member
        )
        model += (
            lpSum(shifts[n][d][s] for d in all_days for s in all_shifts)
            <= min_shift_per_member + 1
        )

    # Distribute bad shifts evenly
    min_bad_shift_per_member = len(bad_shifts) // num_members
    for n in all_members:
        model += (
            lpSum(
                shifts[n][d][s]
                for d in all_days
                for s in all_shifts
                if (d, s) in bad_shifts
            )
            >= min_bad_shift_per_member
        )
        model += (
            lpSum(
                shifts[n][d][s]
                for d in all_days
                for s in all_shifts
                if (d, s) in bad_shifts
            )
            <= min_bad_shift_per_member + 1
        )

    # Only one shift per member per day
    for m in members:
        for d in all_days:
            model += lpSum(shifts[m][d][r] for r in all_shifts) <= 1

    # Every shift in the day must be occupied
    for d in all_days:
        for r in all_shifts:
            model += lpSum(shifts[m][d][r] for m in all_members) == 1

    # Number of shifts that a member has done
    for m in members:
        model += (
            lpSum(shifts[m][d][r] for d in all_days for r in all_shifts) - members[m]
            == 0
        )

    # Prevent two shifts in a row
    # for e in all_members:
    #     for d in range(num_days - 1):
    #         for s1 in all_shifts:
    #             for s2 in all_shifts:
    #                 transition = [shifts[e][d][s1], shifts[e][d + 1][s2]]
    #                 model += lpSum(transition) <= 1

    model.solve()
    res = {d: {} for d in all_days}

    for vi in model.variables():
        if vi.name.split("_")[0] == "shifts":
            person = int(vi.name.split("_")[1])
            day = int(vi.name.split("_")[2])
            role = int(vi.name.split("_")[3])

            if vi.varValue:
                res[day][person] = role

    return res
