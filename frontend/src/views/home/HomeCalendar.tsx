import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import PickersDay, { PickersDayProps } from '@mui/lab/PickersDay';
import StaticDatePicker from '@mui/lab/StaticDatePicker';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import { MemberProps } from '@src/types/user';
import endOfWeek from 'date-fns/endOfWeek';
import isSameDay from 'date-fns/isSameDay';
import isWithinInterval from 'date-fns/isWithinInterval';
import startOfWeek from 'date-fns/startOfWeek';
import * as React from 'react';

type CustomPickerDayProps = PickersDayProps<Date> & {
  dayIsBetween: boolean;
  isFirstDay: boolean;
  isLastDay: boolean;
  isToday: boolean;
};

const CustomPickersDay = styled(PickersDay, {
  shouldForwardProp: (prop) =>
    prop !== 'dayIsBetween' && prop !== 'isFirstDay' && prop !== 'isLastDay',
})<CustomPickerDayProps>(({ theme, dayIsBetween, isFirstDay, isLastDay, isToday }) => ({
  backgroundColor: theme.palette.grey[800],
  color: "white",
  fontSize: 14,
  width: 40,
  height: 40,
  // ...(dayIsBetween && {
  //   borderRadius: 0,
  //   backgroundColor: theme.palette.primary.main,
  //   color: theme.palette.common.white,
  //   '&:hover, &:focus': {
  //     backgroundColor: theme.palette.primary.dark,
  //   },
  // }),
  // ...(isFirstDay && {
  //   borderTopLeftRadius: '50%',
  //   borderBottomLeftRadius: '50%',
  // }),
  // ...(isLastDay && {
  //   borderTopRightRadius: '50%',
  //   borderBottomRightRadius: '50%',
  // }),
  ...(isToday && {
    backgroundColor: theme.palette.secondary.main
  })
})) as React.ComponentType<CustomPickerDayProps>;

const CustomDatePicker = styled(Box)(({ theme }) => ({
  "& .MuiPickerStaticWrapper-root": {
    width: "100%!important",
    maxHeight: "100%!important",
    backgroundColor: theme.palette.grey[800],
    color: theme.palette.common.white,

    "& .MuiTypography-root": {
      color: theme.palette.common.white,

    },

    "& .MuiButtonBase-root": {
      color: theme.palette.common.white,
    },

    weekDays: {
      backgroundColor: "rgba(0, 0, 0, 0.20);",
      border: "1px solid #777",
      color: theme.palette.common.white,

      calenderHeader: {
        display: "flex",
        justifyContent: "center",
        color: theme.palette.common.white,
      },
      vaktDay: {
        backgroundColor: "rgba(120, 0, 0, 0.20);",
        color: theme.palette.common.white,
      }
    }
  }
}));

interface Props {
  members: Array<MemberProps>
}

const HomeCalendar = ({ members }: Props) => {
  const [value, setValue] = React.useState<Date | null>(new Date());
  const renderWeekPickerDay = (
    date: Date,
    selectedDates: Array<Date | null>,
    pickersDayProps: PickersDayProps<Date>,
  ) => {
    if (!value) {
      return <PickersDay {...pickersDayProps} />;
    }

    const start = startOfWeek(value);
    const end = endOfWeek(value);

    const dayIsBetween = isWithinInterval(date, { start, end });
    const isFirstDay = isSameDay(date, start);
    const isLastDay = isSameDay(date, end);
    const isToday = members.map((member: MemberProps) => member.birthDate ? new Date(member.birthDate) : undefined)
      .filter((birthDate) => birthDate != undefined)
      .some((birthDate: any) => date.getUTCMonth() == birthDate.getUTCMonth() && date.getUTCDate() == birthDate.getUTCDate())

    return (
      <CustomPickersDay
        {...pickersDayProps}
        disableMargin
        dayIsBetween={dayIsBetween}
        isFirstDay={isFirstDay}
        isLastDay={isLastDay}
        isToday={isToday}
      />
    );
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <CustomDatePicker>
        <StaticDatePicker
          displayStaticWrapperAs="desktop"
          label="Week picker"
          value={value}
          onChange={(newValue) => {
            setValue(newValue);
          }}
          renderDay={renderWeekPickerDay}
          renderInput={(params) => <TextField {...params} />}
          inputFormat="'Week of' MMM d"
        />
      </CustomDatePicker>
    </LocalizationProvider>
  );
}

export default HomeCalendar;
