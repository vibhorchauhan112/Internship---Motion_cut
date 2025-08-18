document.addEventListener('DOMContentLoaded', () => {
    const plannerContainer = document.getElementById('planner-container');
    const startHour = 7;
    const endHour = 22;

    function createTimeBlocks() {
        for (let hour = startHour; hour <= endHour; hour++) {
            const timeBlock = document.createElement('div');
            timeBlock.classList.add('time-block');
            timeBlock.dataset.hour = hour;

            const displayHour = hour % 12 === 0 ? 12 : hour % 12;
            const ampm = hour < 12 ? 'AM' : 'PM';
            const timeString = `${displayHour}:00 ${ampm}`;

            timeBlock.innerHTML = `
                <div class="hour">${timeString}</div>
                <textarea class="task-input" placeholder="Enter your task..."></textarea>
                <button class="save-btn">Save</button>
                <input type="checkbox" class="complete-checkbox" title="Mark as complete">
            `;
            plannerContainer.appendChild(timeBlock);
        }
    }

    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('dailyPlannerTasks')) || {};
        
        document.querySelectorAll('.time-block').forEach(block => {
            const hour = block.dataset.hour;
            const taskData = tasks[hour];

            if (taskData) {
                const taskInput = block.querySelector('.task-input');
                const checkbox = block.querySelector('.complete-checkbox');

                taskInput.value = taskData.text;
                checkbox.checked = taskData.completed;

                if (taskData.completed) {
                    taskInput.classList.add('completed');
                }
            }
        });
    }

    function setupEventListeners() {
        plannerContainer.addEventListener('click', (event) => {
            if (event.target.classList.contains('save-btn')) {
                const timeBlock = event.target.closest('.time-block');
                const hour = timeBlock.dataset.hour;
                const taskInput = timeBlock.querySelector('.task-input');
                const checkbox = timeBlock.querySelector('.complete-checkbox');

                const tasks = JSON.parse(localStorage.getItem('dailyPlannerTasks')) || {};
                
                tasks[hour] = {
                    text: taskInput.value,
                    completed: checkbox.checked
                };

                localStorage.setItem('dailyPlannerTasks', JSON.stringify(tasks));

                event.target.textContent = 'Saved!';
                setTimeout(() => {
                    event.target.textContent = 'Save';
                }, 1000);
            }
        });

        plannerContainer.addEventListener('change', (event) => {
            if (event.target.classList.contains('complete-checkbox')) {
                const timeBlock = event.target.closest('.time-block');
                const taskInput = timeBlock.querySelector('.task-input');
                
                taskInput.classList.toggle('completed', event.target.checked);

                timeBlock.querySelector('.save-btn').click();
            }
        });
    }

    function init() {
        createTimeBlocks();
        loadTasks();
        setupEventListeners();
    }

    init();
});
