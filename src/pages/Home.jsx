import React, { useEffect, useState } from 'react'
import { Calendar } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import interactionPlugin from "@fullcalendar/interaction";
import Modal from '../components/Modal';
import { BASE_URL } from '../api';
function Home() {
    function renderCalendar() {
			let calendarEl = document.getElementById("calendar");
			let calendar = new Calendar(calendarEl, {
				plugins: [dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin],
				initialView: "dayGridMonth",
				headerToolbar: {
					left: "prev,next today",
					center: "title",
					right: "dayGridMonth,timeGridWeek,listWeek",
				},
				selectable: true,
				dateClick: function (info) {
					//alert("Clicked on: " + info.dateStr);
				},
			});
			calendar.setOption("locale", "fr");

			fetch(`${BASE_URL}/todo`, {
				method: "GET",
				headers: {
					Authorization: `Bearer ${sessionStorage.getItem("token")}`,
				},
			}).then(async (r) => {
				if (r.status === 200) {
					const data = await r.json();

					if (data?.todos) {
						for (let i = 0; i < data?.todos.length; i++) {
							const todo = data?.todos[i];
							calendar.batchRendering(function () {
								calendar.changeView("dayGridMonth");
								calendar.addEvent({
									title: todo?.label,
									durationEditable: true,
                                    start: todo.date,
                                    display: todo?.description,
                                    backgroundColor: "green",
                                    borderColor:"green"
								});
							});
						}
					}
				}
			});
			calendar.render();
		}
    
    
    useEffect(() => {
        renderCalendar()
        
        
    },[])
  return (
		<div className=''>
			
				<Modal/>
		
			<div id='calendar'></div>
		</div>
	);
}

export default Home