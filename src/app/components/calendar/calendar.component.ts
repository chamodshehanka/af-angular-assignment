import {
  Component,
  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef,
  OnInit,
} from '@angular/core';
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours,
} from 'date-fns';

import { Subject, from } from 'rxjs';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView,
} from 'angular-calendar';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';

const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF',
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA',
  },
};

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
})
export class CalendarComponent implements OnInit {
  eventForm: FormGroup;

  // Form Controls
  eventTitle = new FormControl();
  eventStartDate = new FormControl();
  eventEndDate = new FormControl();

  constructor(private modal: NgbModal, private formBuilder: FormBuilder) {
    this.eventForm = this.formBuilder.group({
      eventTitle: '',
      startDate: '',
      endDate: '',
    });

    this.eventForm.valueChanges.subscribe();
  }

  ngOnInit(): void {}

  addNewEvent(): void {
    const title = this.eventTitle.value;
    const startDate = this.eventStartDate.value;
    const endDate = this.eventEndDate.value;

    this.events = [
      ...this.events,
      {
        title: title,
        start: startDate,
        end: endDate,
        color: colors.red,
        actions: this.actions,
        draggable: true,
        resizable: {
          beforeStart: true,
          afterEnd: true,
        },
      },
    ];
  }

  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;

  view: CalendarView = CalendarView.Month;
  CalendarView = CalendarView;

  viewDate: Date = new Date();
  modalData: {
    action: string;
    event: CalendarEvent;
  };

  actions: CalendarEventAction[] = [
    // <i class="fa fa-fw fa-pencil"></i>
    // {
    //   label:
    //     '<button class="uk-button uk-button-danger"><img src="https://img.icons8.com/pastel-glyph/24/000000/edit.png"/></button>',
    //   a11yLabel: 'Edit',
    //   onClick: ({ event }: { event: CalendarEvent }): void => {
    //     this.handleEvent('Edited', event);
    //   },
    // },
    {
      label:
        '<i class="fa fa-fw fa-times"><img src="https://img.icons8.com/android/24/000000/trash.png"/></i>',
      a11yLabel: 'Delete',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter((iEvent) => iEvent !== event);
        this.handleEvent('Deleted', event);
      },
    },
  ];

  refresh: Subject<any> = new Subject();

  events: CalendarEvent[] = [
    {
      start: subDays(startOfDay(new Date()), 1),
      end: addDays(new Date(), 1),
      title: 'Feed the cat',
      color: colors.red,
      actions: this.actions,
      allDay: true,
      resizable: {
        beforeStart: true,
        afterEnd: true,
      },
      draggable: true,
    },
    // {
    //   start: subDays(endOfMonth(new Date()), 3),
    //   end: addDays(endOfMonth(new Date()), 3),
    //   title: 'A long event that spans 2 months',
    //   color: colors.blue,
    //   allDay: true,
    // },
    // {
    //   start: addHours(startOfDay(new Date()), 2),
    //   end: addHours(new Date(), 2),
    //   title: 'A draggable and resizable event',
    //   color: colors.yellow,
    //   actions: this.actions,
    //   resizable: {
    //     beforeStart: true,
    //     afterEnd: true,
    //   },
    //   draggable: true,
    // },
  ];

  activeDayIsOpen: boolean = true;

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd,
  }: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map((iEvent) => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd,
        };
      }
      return iEvent;
    });
    this.handleEvent('Dropped or resized', event);
  }

  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = { event, action };
    this.modal.open(this.modalContent, { size: 'lg' });
  }

  addEvent(): void {
    this.events = [
      ...this.events,
      {
        title: 'New event',
        start: startOfDay(new Date()),
        end: endOfDay(new Date()),
        color: colors.red,
        actions: this.actions,
        draggable: true,
        resizable: {
          beforeStart: true,
          afterEnd: true,
        },
      },
    ];

    // events array sort
    // this.events.sort((a,b) => a,b);
  }

  deleteEvent(eventToDelete: CalendarEvent) {
    this.events = this.events.filter((event) => event !== eventToDelete);
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }

  calculateDateDifference(startDate: Date, endDate: Date) {
    let currentDate = new Date();
    startDate = new Date(startDate);

    var differet = Math.floor(
      (Date.UTC(
        startDate.getFullYear(),
        startDate.getMonth(),
        startDate.getDate(),
        startDate.getTime()
      ) -
        Date.UTC(
          currentDate.getFullYear(),
          currentDate.getMonth(),
          currentDate.getDate(),
          currentDate.getTime()
        )) /
        (1000 * 60 * 60 * 24)
    );

    var endDifference = Math.floor(
      (endDate.getFullYear(),
      endDate.getMonth(),
      endDate.getDate(),
      endDate.getTime()) -
        (currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate(),
        currentDate.getTime())
    );

    if (differet > 0) {
      return 'Pending';
    } else if (endDifference) {
      return 'On going';
    }

    return 'Expired';
  }
}
