import { useEffect, useState, useRef, FormEvent } from "react";

import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";

import { ICalendar, IEditingEvent } from "../interfaces/Calendar";

import {
  createEventCalendar,
  deleteEventCalendar,
  updateEventCalendar,
} from "../utils/calendarUtils";

interface IEventFormDialogProps {
  eventEditing: IEditingEvent | null;
  calendars: ICalendar[];
  onCancel: () => void;
  onSave: () => void;
}

interface IValidationErrors {
  [field: string]: string;
}

export const EventFormDialog = ({
  eventEditing,
  calendars,
  onCancel,
  onSave,
}: IEventFormDialogProps) => {
  const [currentEvent, setCurrentEvent] = useState<IEditingEvent | null>(
    eventEditing
  );

  const [errors, setErrors] = useState<IValidationErrors>({});

  const inputDateRef = useRef<HTMLInputElement>();
  const inputDescRef = useRef<HTMLInputElement>();

  const isNewEventDate = !currentEvent?.id;

  function validateEvent(): boolean {
    if (currentEvent) {
      const currentErrors: IValidationErrors = {};

      if (!currentEvent.date) {
        currentErrors["date"] = "A data deve ser preenchida!";

        inputDateRef.current?.focus();
      }

      if (!currentEvent.desc) {
        currentErrors["desc"] = "A descrição deve ser preenchida!";

        inputDescRef.current?.focus();
      }

      setErrors(currentErrors);

      return Object.keys(currentErrors).length === 0;
    }

    return false;
  }

  async function saveEventCalendar(event: FormEvent) {
    event.preventDefault();

    if (currentEvent) {
      if (validateEvent()) {
        if (isNewEventDate) {
          await createEventCalendar(currentEvent);
        } else {
          await updateEventCalendar(currentEvent);
        }

        onSave();
        setErrors({});
      }
    }
  }

  async function deleteEvent() {
    if (currentEvent) {
      await deleteEventCalendar(currentEvent.id!);

      onSave();
      setErrors({});
    }
  }

  useEffect(() => {
    setCurrentEvent(eventEditing);
  }, [eventEditing]);

  return (
    <>
      <Dialog open={!!currentEvent} onClose={onCancel}>
        <DialogTitle>
          {isNewEventDate ? "Criar Evento" : "Editar Evento"}
        </DialogTitle>
        {currentEvent && (
          <form onSubmit={saveEventCalendar}>
            <DialogContent>
              <TextField
                type='date'
                margin='normal'
                label='Data'
                inputRef={inputDateRef}
                value={currentEvent.date}
                onChange={(event) =>
                  setCurrentEvent({ ...currentEvent, date: event.target.value })
                }
                error={!!errors.date}
                helperText={errors.date}
                InputLabelProps={{ shrink: true }}
                fullWidth
              />
              <TextField
                margin='normal'
                label='Descrição'
                inputRef={inputDescRef}
                value={currentEvent.desc}
                onChange={(event) =>
                  setCurrentEvent({ ...currentEvent, desc: event.target.value })
                }
                error={!!errors.desc}
                helperText={errors.desc}
                autoFocus
                InputLabelProps={{ shrink: true }}
                fullWidth
              />
              <TextField
                type='time'
                margin='normal'
                label='Hora'
                value={currentEvent.time ?? ""}
                onChange={(event) =>
                  setCurrentEvent({ ...currentEvent, time: event.target.value })
                }
                InputLabelProps={{ shrink: true }}
                fullWidth
              />
              <FormControl fullWidth>
                <InputLabel>Agenda</InputLabel>
                <Select
                  value={currentEvent.calendarId}
                  onChange={(event) =>
                    setCurrentEvent({
                      ...currentEvent,
                      calendarId: Number(event.target.value),
                    })
                  }
                >
                  {calendars?.map((calendar) => (
                    <MenuItem key={calendar.id} value={calendar.id}>
                      {calendar.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </DialogContent>
            <DialogActions>
              {!isNewEventDate && (
                <Button type='button' color='error' onClick={deleteEvent}>
                  Excluir
                </Button>
              )}
              <Box display='flex' flex='1'></Box>
              <Button
                type='button'
                onClick={() => {
                  setErrors({});
                  onCancel();
                }}
              >
                Cancelar
              </Button>
              <Button type='submit' color='primary'>
                Salvar
              </Button>
            </DialogActions>
          </form>
        )}
      </Dialog>
    </>
  );
};
