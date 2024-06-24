import { useHistory } from "react-router-dom";

import {
  ChevronLeftOutlined,
  ChevronRightOutlined,
  Person,
} from "@mui/icons-material";
import { Avatar, Box, IconButton } from "@mui/material";

import { addMonths, formatMonth } from "../utils/dateUtils";

interface ICalendarHeaderProps {
  month: string;
}

export const CalendarHeader = ({ month }: ICalendarHeaderProps) => {
  const history = useHistory();

  return (
    <>
      <Box display='flex' alignItems='center' p='8px 16px'>
        <Box>
          <IconButton
            aria-label='Mês Anterior'
            onClick={() => history.push(`/calendar/${addMonths(month, -1)}`)}
          >
            <ChevronLeftOutlined />
          </IconButton>

          <IconButton
            aria-label='Proxímo Mês'
            onClick={() => history.push(`/calendar/${addMonths(month, 1)}`)}
          >
            <ChevronRightOutlined />
          </IconButton>
        </Box>
        <Box flex='1' component='h3' ml='16px'>
          {formatMonth(month)}
        </Box>

        <IconButton>
          <Avatar>
            <Person />
          </Avatar>
        </IconButton>
      </Box>
    </>
  );
};
