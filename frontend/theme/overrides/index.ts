import { Theme } from '@mui/material/styles';
import Autocomplete from './Autocomplete';
import Backdrop from './Backdrop';
import BottomNavigation from './BottomNavigation';
import Button from './Button';
import Card from './Card';
import Chip from './Chip';
import Container from './Container';
import IconButton from './IconButton';
import Input from './Input';
import Lists from './Lists';
import Paper from './Paper';
import Table from './Table';
import Tooltip from './Tooltip';
import Typography from './Typography';

// ----------------------------------------------------------------------

export default function ComponentsOverrides(theme: Theme) {
  return Object.assign(
    Card(theme),
    Lists(theme),
    Paper(),
    Input(theme),
    Button(theme),
    Tooltip(theme),
    Backdrop(theme),
    Typography(theme),
    IconButton(theme),
    Autocomplete(theme),
    BottomNavigation(theme),
    Container(theme),
    Chip(theme),
    Table(theme)
  );
}
