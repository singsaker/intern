import parse from 'parse-duration';

// Konverter sekunder til timer og minutter
const parseDuration = (duration: string | number) => {
  const res = parse(duration + 's', 'h');
  const minutes = Math.round(parse((res % 1) + 'h', 'm'));

  return Math.floor(res) + ' timer' + (minutes != 0 ? ', ' + minutes + ' min' : '');
};

export default parseDuration;
