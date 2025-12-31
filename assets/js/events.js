document.addEventListener("DOMContentLoaded", function () {
    fetch("/assets/events/" + year + ".yaml")
        .then(response => response.text())
        .then(yamlText => {
            const allEvents = jsyaml.load(yamlText);
            renderCalendarAndEvents(allEvents);
        })
        .catch(error => console.error("Error loading events:", error));

    function renderCalendarAndEvents(allEvents) {
        const calendarAndEventsContainer = document.getElementById("calendarAndEvents");
        const months = [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ];

        months.forEach((month, index) => {
            const row = document.createElement("div");
            row.className = "row mb-4 calender-month";

            // Left or right positioning based on even or odd index
            const calendarCol = document.createElement("div");
            calendarCol.className = index % 2 === 0 ? "col-md-6 order-md-1" : "col-md-6 order-md-2";
            calendarCol.innerHTML = `<h3>${month}</h3>`;
            calendarCol.appendChild(createMonthView(index + 1, allEvents)); // Adjusted index
            row.appendChild(calendarCol);

            const eventsCol = document.createElement("div");
            eventsCol.className = index % 2 === 0 ? "col-md-6 order-md-2" : "col-md-6 order-md-1";
            eventsCol.innerHTML = `<strong></strong>`;
            eventsCol.appendChild(createEventList(index, allEvents));
            row.appendChild(eventsCol);

            calendarAndEventsContainer.appendChild(row);
        });
    }


    function createEventList(month, allEvents) {
        const selectedMonthEvents = filterEventsByMonth(allEvents, month);

        // Sort events by date
        selectedMonthEvents.sort((a, b) => dayjs(a.date).diff(dayjs(b.date)));

        const eventListContainer = document.createElement("div");
        eventListContainer.className = "event-container";

        if (selectedMonthEvents.length === 0) {
            const noEventsItem = document.createElement("p");
            noEventsItem.textContent = "No events for this month";
            eventListContainer.appendChild(noEventsItem);
        } else {
            // Find the next upcoming event
            const today = dayjs();
            const upcomingEvent = selectedMonthEvents.find(event => today.isBefore(dayjs(event.date), 'day'));

            selectedMonthEvents.forEach(event => {
                const eventDate = dayjs(event.date);
                const isSameYear = dayjs().year(year).year() === eventDate.year();

                if (isSameYear) {
                    const eventItem = document.createElement("p");
                    eventItem.className = "event-item";


                    // Add the "faded" class to events in the past
                    if (dayjs().isAfter(dayjs(event.date), 'day')) {
                        eventItem.classList.add("faded");
                    }

                    // Highlight upcoming event or events on the current day in red
                    if (upcomingEvent && event === upcomingEvent) {
                        eventItem.classList.add("upcoming-event");
                    } else if (dayjs().isSame(dayjs(event.date), 'day')) {
                        eventItem.classList.add("current-day-event");
                    }

                    let eventHtml = '';
                    if (event.date && event.title) {
                        // Show day and event name in a single line
                        eventHtml += `<a href="${event.link}" target="_blank"><strong>${getOrdinalSuffix(dayjs(event.date).date())}</strong> - ${event.title}</a>`;

                        // Add blog icon at the end of the title if the blog value is present
                        if (event.blog) {
                            eventHtml += `<a href="${event.blog}"><i class="bi bi-journal-text ml-2"></i></a>`;
                        }

                        eventItem.innerHTML = eventHtml;
                        eventListContainer.appendChild(eventItem);
                    }
                }

            });

            // Display the next upcoming event with a bigger title
            // if (upcomingEvent) {
            //     const upcomingEventItem = document.createElement("div");
            //     upcomingEventItem.className = "upcoming-event";
            //     upcomingEventItem.innerHTML = `<div><strong>${getOrdinalSuffix(dayjs(upcomingEvent.date).date())}</strong> ${upcomingEvent.title}</div>`;
            //     document.getElementById("calendarAndEvents").insertBefore(upcomingEventItem, document.getElementById("calendarAndEvents").firstChild);
            // }
        }

        return eventListContainer;
    }

    function createMonthView(month, allEvents) {
        const today = dayjs();
        const monthValue = month;
        const firstDayOfMonth = dayjs().year(year).month(monthValue - 1).startOf("month").day(); // Adjusted month index
        const daysInMonth = dayjs().year(year).month(monthValue - 1).daysInMonth(); // Adjusted month index

        const monthView = document.createElement("ul");
        monthView.className = "calendar-month";

        // Day names
        const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        for (let i = 0; i < dayNames.length; i++) {
            const dayNameCell = document.createElement("li");
            dayNameCell.className = "calendar-day day-name";
            dayNameCell.textContent = dayNames[i];
            monthView.appendChild(dayNameCell);
        }

        // Empty cells for days before the 1st day of the month
        for (let i = 0; i < firstDayOfMonth; i++) {
            const emptyCell = document.createElement("li");
            emptyCell.className = "calendar-day";
            monthView.appendChild(emptyCell);
        }

        // Days of the month
        for (let day = 1; day <= daysInMonth; day++) {
            const date = dayjs().year(year).month(monthValue - 1).date(day).format("YYYY-MM-DD");
            const dayElement = document.createElement("li");
            dayElement.className = "calendar-day";
            dayElement.textContent = day;

            // Apply faded class for previous days
            if (today.isAfter(dayjs().year(year).month(monthValue - 1).date(day), 'day')) {
                dayElement.classList.add("faded");
            }

            if (hasEvents(allEvents, date)) {
                dayElement.classList.add("event-marker");
                dayElement.title = "Event Date";
                // Also add faded class to event markers if they're in the past
                if (today.isAfter(dayjs().year(year).month(monthValue - 1).date(day), 'day')) {
                    dayElement.classList.add("faded");
                }
            }

            // dayElement.addEventListener("click", function () {
            //     const selectedMonthEvents = filterEventsByMonth(allEvents, monthValue);
            //     const selectedDayEvents = selectedMonthEvents.filter(event => event.date === date);
            //     renderEventList(selectedDayEvents);
            // });

            monthView.appendChild(dayElement);
        }

        return monthView;
    }


    function hasEvents(allEvents, date) {
        return allEvents.some(event => dayjs(event.date).format("YYYY-MM-DD") === date);
    }

    function filterEventsByMonth(allEvents, selectedMonth) {
        return allEvents.filter(event => dayjs(event.date).month() === selectedMonth);
    }

    function renderEventList(events) {
        const eventListContainer = document.getElementById("eventList");
        eventListContainer.innerHTML = "";

        if (events.length === 0) {
            eventListContainer.innerHTML = "<p>No events for selected day</p>";
        } else {
            events.forEach(event => {
                const eventItem = document.createElement("li");
                eventItem.className = "event";
                eventItem.innerHTML = `
            <h3>${event.title}</h3>
            <p>Date: ${dayjs(event.date).format("MMMM D, YYYY")}</p>
            <p><a href="${event.link}" target="_blank">Event Link</a></p>
          `;
                eventListContainer.appendChild(eventItem);
            });
        }
    }

    function getOrdinalSuffix(number) {
        const suffixes = ["th", "st", "nd", "rd"];
        const v = number % 100;
        return number + '<sup>' + (suffixes[(v - 20) % 10] || suffixes[v] || suffixes[0]) + '</sup>';
    }

});