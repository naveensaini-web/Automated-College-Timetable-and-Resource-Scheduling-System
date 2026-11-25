
/*
    CAMPUSFLOW
    Interactive College Timetable System

    Frontend demonstration using JavaScript.
    Data is stored in browser localStorage.
*/


// ======================================
// 1. COLLEGE TIMING
// ======================================

const DAYS = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday"
];

const PERIODS = [
    {
        label: "Period 1",
        time: "8:00 – 8:50 AM"
    },
    {
        label: "Period 2",
        time: "8:50 – 9:40 AM"
    },
    {
        label: "Period 3",
        time: "9:40 – 10:30 AM"
    },
    {
        label: "Period 4",
        time: "10:30 – 11:20 AM"
    },
    {
        label: "Period 5",
        time: "11:50 AM – 12:40 PM"
    },
    {
        label: "Period 6",
        time: "12:40 – 1:30 PM"
    }
];

const LUNCH = "11:20 – 11:50 AM";


// ======================================
// 2. SAMPLE DATABASE
// ======================================

const seedData = {

    faculty: [

        {id:1,name:"Aarav Sharma",email:"aarav@campus.edu",department:"Computer Science"},

        {id:2,name:"Meera Iyer",email:"meera@campus.edu",department:"Computer Science"},

        {id:3,name:"Kabir Singh",email:"kabir@campus.edu",department:"Information Technology"},

        {id:4,name:"Ananya Das",email:"ananya@campus.edu",department:"Mathematics"},

        {id:5,name:"Rohan Verma",email:"rohan@campus.edu",department:"Electronics"},

        {id:6,name:"Sara Khan",email:"sara@campus.edu",department:"Computer Science"},

        {id:7,name:"Dev Patel",email:"dev@campus.edu",department:"Physics"},

        {id:8,name:"Nisha Rao",email:"nisha@campus.edu",department:"Information Technology"},

        {id:9,name:"Vikram Joshi",email:"vikram@campus.edu",department:"Computer Science"},

        {id:10,name:"Priya Nair",email:"priya@campus.edu",department:"Mathematics"},

        {id:11,name:"Kunal Mehta",email:"kunal@campus.edu",department:"Electronics"},

        {id:12,name:"Ishita Roy",email:"ishita@campus.edu",department:"Computer Science"},

        {id:13,name:"Arjun Kapoor",email:"arjun@campus.edu",department:"Information Technology"},

        {id:14,name:"Sana Ali",email:"sana@campus.edu",department:"Computer Science"},

        {id:15,name:"Rahul Bose",email:"rahul@campus.edu",department:"Physics"},

        {id:16,name:"Tanya Shah",email:"tanya@campus.edu",department:"Mathematics"},

        {id:17,name:"Manav Gill",email:"manav@campus.edu",department:"Electronics"},

        {id:18,name:"Diya Menon",email:"diya@campus.edu",department:"Computer Science"}

    ],


    batches: [

        {id:1,name:"CSE-A",semester:"Semester 4",strength:42},

        {id:2,name:"CSE-B",semester:"Semester 4",strength:38},

        {id:3,name:"IT-A",semester:"Semester 4",strength:36}

    ],


    rooms: [

        {id:1,name:"Room 101",capacity:60,type:"Classroom"},

        {id:2,name:"Room 102",capacity:50,type:"Classroom"},

        {id:3,name:"Room 201",capacity:45,type:"Computer Lab"},

        {id:4,name:"Room 202",capacity:40,type:"Computer Lab"},

        {id:5,name:"Seminar Hall",capacity:100,type:"Seminar Hall"}

    ],


    subjects: [

        // CSE-A

        {id:1,name:"Data Structures",code:"CS401",facultyId:1,batchId:1},

        {id:2,name:"Database Systems",code:"CS402",facultyId:2,batchId:1},

        {id:3,name:"Operating Systems",code:"CS403",facultyId:3,batchId:1},

        {id:4,name:"Mathematics",code:"MA401",facultyId:4,batchId:1},

        {id:5,name:"Computer Networks",code:"CS404",facultyId:5,batchId:1},

        {id:6,name:"Java Programming",code:"CS405",facultyId:6,batchId:1},


        // CSE-B

        {id:7,name:"Web Development",code:"CS411",facultyId:7,batchId:2},

        {id:8,name:"Python Programming",code:"CS412",facultyId:8,batchId:2},

        {id:9,name:"Software Engineering",code:"CS413",facultyId:9,batchId:2},

        {id:10,name:"Discrete Mathematics",code:"MA411",facultyId:10,batchId:2},

        {id:11,name:"Digital Electronics",code:"EC411",facultyId:11,batchId:2},

        {id:12,name:"Cloud Computing",code:"CS414",facultyId:12,batchId:2},


        // IT-A

        {id:13,name:"C Programming",code:"IT401",facultyId:13,batchId:3},

        {id:14,name:"Computer Architecture",code:"IT402",facultyId:14,batchId:3},

        {id:15,name:"Applied Physics",code:"PH401",facultyId:15,batchId:3},

        {id:16,name:"Probability",code:"MA402",facultyId:16,batchId:3},

        {id:17,name:"Data Communication",code:"IT403",facultyId:17,batchId:3},

        {id:18,name:"Web Technologies",code:"IT404",facultyId:18,batchId:3}

    ],


    timetable: [],

    generatedAt: null

};


// ======================================
// 3. LOAD AND SAVE DATA
// ======================================

function clone(value) {

    return JSON.parse(JSON.stringify(value));

}


function loadData() {

    try {

        const saved = localStorage.getItem(
            "campusflow-demo-data"
        );

        if (!saved) {

            return clone(seedData);

        }

        return {
            ...clone(seedData),
            ...JSON.parse(saved)
        };

    } catch (error) {

        console.warn(
            "Using sample data because saved data could not be read.",
            error
        );

        return clone(seedData);

    }

}


let data = loadData();

let currentPage = "dashboard";

let selectedBatchId = 1;

let toastTimer;


function saveData() {

    localStorage.setItem(
        "campusflow-demo-data",
        JSON.stringify(data)
    );

}


// ======================================
// 4. HELPER FUNCTIONS
// ======================================

function escapeHTML(value) {

    return String(value ?? "").replace(
        /[&<>"']/g,

        character => ({

            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#039;"

        })[character]

    );

}


function showToast(message) {

    const toast = document.getElementById("toast");

    toast.textContent = message;

    toast.classList.add("show");

    clearTimeout(toastTimer);

    toastTimer = setTimeout(() => {

        toast.classList.remove("show");

    }, 2800);

}


// ======================================
// 5. PAGE NAVIGATION
// ======================================

function setPage(page) {

    currentPage = page;

    document.querySelectorAll(".nav-link").forEach(button => {

        button.classList.toggle(
            "active",
            button.dataset.page === page
        );

    });


    const labels = {

        dashboard: "Dashboard",
        timetable: "Timetable",
        generate: "Generate Schedule",
        faculty: "Faculty",
        subjects: "Subjects",
        batches: "Student Batches",
        rooms: "Classrooms",
        conflicts: "Conflict Checker"

    };


    document.getElementById(
        "breadcrumbTitle"
    ).textContent = labels[page] || "Dashboard";


    document.getElementById(
        "sidebar"
    ).classList.remove("open");


    const pages = {

        dashboard: renderDashboard,

        timetable: renderTimetable,

        generate: renderGenerate,

        faculty: () => renderManage("faculty"),

        subjects: () => renderManage("subjects"),

        batches: () => renderManage("batches"),

        rooms: () => renderManage("rooms"),

        conflicts: renderConflicts

    };


    (pages[page] || renderDashboard)();

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


// ======================================
// 6. COMMON PAGE HEADING
// ======================================

function pageHeading(title, subtitle, action = "") {

    return `

        <div class="page-title-row">

            <div>

                <div class="eyebrow">
                    COLLEGE RESOURCE MANAGEMENT
                </div>

                <h1>${title}</h1>

                <p class="page-subtitle">
                    ${subtitle}
                </p>

            </div>

            ${action}

        </div>

    `;

}


// ======================================
// 7. DASHBOARD FUNCTIONS
// ======================================

function statCard(icon, value, label, note) {

    return `

        <div class="stat-card">

            <div class="stat-top">

                <div class="stat-icon">
                    ${icon}
                </div>

                <span class="pill">DEMO</span>

            </div>

            <div class="stat-label">
                ${label}
            </div>

            <div class="stat-value">
                ${value}
            </div>

            <div class="stat-note">
                ${note}
            </div>

        </div>

    `;

}


function quickAction(icon, title, note, page) {

    return `

        <button class="quick-action"
                data-page="${page}">

            <span class="quick-icon">
                ${icon}
            </span>

            <span>

                <strong>${title}</strong>

                <small>${note}</small>

            </span>

        </button>

    `;

}


function renderDashboard() {

    const upcoming = data.timetable.slice(0, 5);


    const rows = upcoming.map(item => `

        <tr>

            <td>

                <span class="td-strong">
                    ${escapeHTML(item.subject)}
                </span>

                <br>

                <span class="muted">
                    ${escapeHTML(item.batchName)}
                </span>

            </td>


            <td>

                ${PERIODS[item.period].time}

                <br>

                <span class="muted">
                    ${escapeHTML(item.day)}
                </span>

            </td>


            <td>
                ${escapeHTML(item.room)}
            </td>


            <td>
                <span class="status">
                    Scheduled
                </span>
            </td>

        </tr>

    `).join("");


    document.getElementById("appContent").innerHTML = `

        ${pageHeading(
            "Dashboard",
            "Your college scheduling workspace at a glance.",
            '<button class="btn" data-page="generate">✦ Generate Timetable</button>'
        )}


        <section class="hero">

            <div class="hero-copy">

                <h2>
                    Welcome to CampusFlow 👋
                </h2>

                <p>
                    Manage college schedules intelligently.
                    Organize faculty, subjects, student batches
                    and classrooms, then generate a sample
                    clash-free weekly timetable.
                </p>

            </div>

            <button class="btn" data-page="generate">
                ✦ Generate Timetable
            </button>

        </section>


        <section class="stats-grid">

            ${statCard(
                "♙",
                data.faculty.length,
                "Faculty Members",
                "Teaching staff registered"
            )}

            ${statCard(
                "▣",
                data.subjects.length,
                "Subjects",
                "Subjects across all batches"
            )}

            ${statCard(
                "♧",
                data.batches.length,
                "Student Batches",
                "Active student groups"
            )}

            ${statCard(
                "⌂",
                data.rooms.length,
                "Classrooms",
                "Available college resources"
            )}

        </section>


        <section class="dashboard-grid">

            <div class="panel">

                <div class="panel-head">

                    <div>

                        <h2>
                            Recent Scheduled Classes
                        </h2>

                        <p>
                            Sample classes from the generated timetable
                        </p>

                    </div>

                    <button class="text-link"
                            data-page="timetable">

                        View timetable →

                    </button>

                </div>


                ${rows ?

                    `<div class="table-wrap">

                        <table>

                            <thead>

                                <tr>
                                    <th>SUBJECT / BATCH</th>
                                    <th>TIME / DAY</th>
                                    <th>ROOM</th>
                                    <th>STATUS</th>
                                </tr>

                            </thead>

                            <tbody>
                                ${rows}
                            </tbody>

                        </table>

                    </div>`

                    :

                    `<div class="empty-state">

                        No timetable generated yet.
                        Select Generate Timetable to create
                        your first sample schedule.

                    </div>`

                }

            </div>


            <div class="panel">

                <div class="panel-head">

                    <div>

                        <h2>Quick Actions</h2>

                        <p>
                            Manage your college information
                        </p>

                    </div>

                </div>


                <div class="quick-actions">

                    ${quickAction(
                        "♙",
                        "Manage Faculty",
                        "Add or view teaching staff",
                        "faculty"
                    )}

                    ${quickAction(
                        "▣",
                        "Manage Subjects",
                        "Organize subjects and faculty",
                        "subjects"
                    )}

                    ${quickAction(
                        "⌂",
                        "Manage Classrooms",
                        "View rooms and capacity",
                        "rooms"
                    )}

                    ${quickAction(
                        "✓",
                        "Check Conflicts",
                        "Validate the current timetable",
                        "conflicts"
                    )}

                </div>

            </div>

        </section>


        <div class="info-strip">

            <strong>i</strong>

            <span>
                This is a frontend demonstration using fictional
                college data. Changes are saved in this browser only;
                a database and backend can be connected by your
                teammates later.
            </span>

        </div>

    `;

}


// ======================================
// 8. SHUFFLE SUBJECTS
// ======================================

function shuffle(array) {

    const result = [...array];


    for (
        let i = result.length - 1;
        i > 0;
        i--
    ) {

        const j = Math.floor(
            Math.random() * (i + 1)
        );

        [result[i], result[j]] = [
            result[j],
            result[i]
        ];

    }

    return result;

}


// ======================================
// 9. GENERATE TIMETABLE PAGE
// ======================================

function renderGenerate() {

    document.getElementById("appContent").innerHTML = `

        ${pageHeading(
            "Generate Timetable",
            "Create a new fictional weekly schedule for the selected college batches."
        )}


        <div class="split-layout">


            <section class="panel">

                <div class="panel-head">

                    <div>

                        <h2>
                            Automatic Schedule Generator
                        </h2>

                        <p>
                            Demo scheduling with sample subjects,
                            faculty and rooms
                        </p>

                    </div>

                    <span class="pill">
                        DEMO ENGINE
                    </span>

                </div>


                <p class="page-subtitle">

                    Click below to prepare a new Monday–Friday timetable.
                    Each batch gets six 50-minute classes per day,
                    with lunch between Period 4 and Period 5.

                </p>


                <div class="feature-grid">

                    <div class="feature-card">

                        <b>01 · Organize</b>

                        <p>
                            Use the saved sample batches and subjects.
                        </p>

                    </div>


                    <div class="feature-card">

                        <b>02 · Assign</b>

                        <p>
                            Rotate the subjects across available periods.
                        </p>

                    </div>


                    <div class="feature-card">

                        <b>03 · Validate</b>

                        <p>
                            Check that a teacher, batch or room
                            is not double-booked.
                        </p>

                    </div>

                </div>


                <div class="form-actions">

                    <button class="btn"
                            data-action="generate">

                        ✦ Generate New Timetable

                    </button>


                    <button class="btn secondary"
                            data-page="timetable">

                        View Current Timetable

                    </button>

                </div>


                <div class="info-strip">

                    <strong>i</strong>

                    <span>
                        Generating again replaces the previous
                        sample timetable. Faculty, subjects,
                        batches and classroom records remain unchanged.
                    </span>

                </div>

            </section>



            <section class="panel">

                <div class="panel-head">

                    <div>

                        <h2>College Timing</h2>

                        <p>Monday to Friday</p>

                    </div>

                </div>


                <table>

                    <tbody>

                        ${PERIODS.slice(0, 4).map(period => `

                            <tr>

                                <td>${period.label}</td>

                                <td>${period.time}</td>

                            </tr>

                        `).join("")}


                        <tr>

                            <td>
                                <b>Lunch Break</b>
                            </td>

                            <td>

                                <span class="status warning">
                                    ${LUNCH}
                                </span>

                            </td>

                        </tr>


                        ${PERIODS.slice(4).map(period => `

                            <tr>

                                <td>${period.label}</td>

                                <td>${period.time}</td>

                            </tr>

                        `).join("")}

                    </tbody>

                </table>


                <div class="info-strip">

                    <strong>✓</strong>

                    <span>
                        College begins at 8:00 AM and finishes
                        at 1:30 PM. Each lecture lasts exactly
                        50 minutes.
                    </span>

                </div>

            </section>


        </div>

    `;

}


// ======================================
// 10. TIMETABLE GENERATION LOGIC
// ======================================

function generateTimetable() {

    if (
        !data.batches.length ||
        !data.subjects.length ||
        !data.rooms.length
    ) {

        showToast(
            "Please add at least one batch, subject and classroom first."
        );

        return;

    }


    // Check classroom capacity

    const noRoom = data.batches.find(batch =>

        !data.rooms.some(room =>

            Number(room.capacity) >= Number(batch.strength)

        )

    );


    if (noRoom) {

        showToast(
            `${noRoom.name} is larger than every available classroom. Update room capacity first.`
        );

        return;

    }


    const created = [];

    const batches = [...data.batches].sort(
        (a, b) => a.id - b.id
    );


    // Generate timetable for each weekday

    for (const day of DAYS) {

        batches.forEach((batch, batchIndex) => {

            let list = shuffle(

                data.subjects.filter(subject =>

                    Number(subject.batchId) === Number(batch.id)

                )

            );


            const original = data.subjects.filter(subject =>

                Number(subject.batchId) === Number(batch.id)

            );


            if (!original.length) return;


            // Reuse subjects if fewer than six are available

            while (list.length < 6) {

                list.push(
                    original[list.length % original.length]
                );

            }


            const usable = list.slice(0, 6);


            // Six lecture periods

            for (let period = 0; period < 6; period++) {

                const subject = usable[period];


                const teacher = data.faculty.find(faculty =>

                    faculty.id === Number(subject.facultyId)

                );


                const rooms = data.rooms.filter(room =>

                    Number(room.capacity) >= Number(batch.strength)

                );


                // Assign a room

                const room = rooms[
                    (batchIndex + period) % rooms.length
                ];


                created.push({

                    day: day,

                    period: period,

                    batchId: batch.id,

                    batchName: batch.name,

                    subject: subject.name,

                    subjectCode: subject.code,

                    facultyId: teacher ? teacher.id : null,

                    faculty: teacher
                        ? teacher.name
                        : "Faculty not assigned",

                    roomId: room.id,

                    room: room.name

                });

            }

        });

    }


    // Save timetable

    data.timetable = created;

    data.generatedAt = new Date().toLocaleString();

    saveData();


    // Validate schedule

    const conflicts = findConflicts();


    if (conflicts.length) {

        showToast(
            "Timetable generated, but validation found conflicts."
        );

    } else {

        showToast(
            "Success! New weekly timetable generated without clashes."
        );

    }


    // Open timetable page

    setPage("timetable");

}


// ======================================
// 11. DISPLAY WEEKLY TIMETABLE
// ======================================

function renderTimetable() {

    if (!data.timetable.length) {

        document.getElementById("appContent").innerHTML = `

            ${pageHeading(
                "Weekly Timetable",
                "View the sample college schedule by student batch."
            )}

            <section class="panel empty-state">

                <h2>No timetable generated yet</h2>

                <p>
                    Generate a sample timetable to see classes
                    for Monday to Friday.
                </p>

                <button class="btn" data-page="generate">

                    ✦ Go to Generate Timetable

                </button>

            </section>

        `;

        return;

    }


    // Make sure selected batch still exists

    if (!data.batches.some(batch =>

        Number(batch.id) === Number(selectedBatchId)

    )) {

        selectedBatchId = data.batches[0]?.id;

    }


    // Batch dropdown

    const options = data.batches.map(batch => `

        <option value="${batch.id}"
            ${Number(batch.id) === Number(selectedBatchId)
                ? "selected"
                : ""}>

            ${escapeHTML(batch.name)}

        </option>

    `).join("");


    const rows = [];


    // Create six period rows

    for (let period = 0; period < 6; period++) {


        // Lunch break after Period 4

        if (period === 4) {

            rows.push(`

                <tr>

                    <td class="lunch-cell" colspan="6">

                        ☕ LUNCH BREAK · ${LUNCH}

                    </td>

                </tr>

            `);

        }


        // Create Monday to Friday cells

        const cells = DAYS.map(day => {


            const item = data.timetable.find(t =>

                t.day === day &&
                t.period === period &&
                Number(t.batchId) === Number(selectedBatchId)

            );


            return `

                <td>

                    ${item ? `

                        <div class="class-card">

                            <strong>
                                ${escapeHTML(item.subject)}
                            </strong>

                            <span>
                                ${escapeHTML(item.faculty)}
                            </span>

                            <em>
                                ${escapeHTML(item.room)}
                            </em>

                        </div>

                    ` : `

                        <span class="muted">—</span>

                    `}

                </td>

            `;

        }).join("");


        rows.push(`

            <tr>

                <td class="time-cell">

                    ${PERIODS[period].label}

                    <br><br>

                    ${PERIODS[period].time}

                </td>

                ${cells}

            </tr>

        `);

    }


    document.getElementById("appContent").innerHTML = `

        ${pageHeading(
            "Weekly Timetable",
            "Monday to Friday · 8:00 AM to 1:30 PM",
            '<button class="btn secondary" data-action="export">⇩ Export CSV</button>'
        )}


        <section class="panel">


            <div class="toolbar">


                <div class="field">

                    <label>SELECT STUDENT BATCH</label>

                    <select id="batchFilter">

                        ${options}

                    </select>

                </div>


                <div class="field">

                    <label>COLLEGE HOURS</label>

                    <input value="8:00 AM – 1:30 PM" readonly>

                </div>


                <button class="btn" data-page="generate">
                    ✦ Generate Again
                </button>


                <button class="btn ghost" data-page="conflicts">
                    ✓ Check Conflicts
                </button>


            </div>


            <div class="info-strip" style="margin:0 0 14px">

                <strong>i</strong>

                <span>
                    Each lecture is 50 minutes.
                    Lunch is scheduled from 11:20 AM to 11:50 AM.
                </span>

            </div>


            <div class="timetable-scroll">

                <table class="timetable-grid">

                    <thead>

                        <tr>

                            <th>TIME / PERIOD</th>

                            ${DAYS.map(day => `

                                <th>${day.toUpperCase()}</th>

                            `).join("")}

                        </tr>

                    </thead>


                    <tbody>

                        ${rows.join("")}

                    </tbody>

                </table>

            </div>


            <div class="panel-head"
                 style="margin-top:14px;margin-bottom:0">

                <p>
                    Last generated:
                    ${escapeHTML(data.generatedAt || "Not available")}
                </p>

                <span class="pill">

                    ${data.timetable.filter(item =>

                        Number(item.batchId) === Number(selectedBatchId)

                    ).length}

                    CLASS SESSIONS

                </span>

            </div>


        </section>

    `;

}


// ======================================
// 12. CONFLICT DETECTION
// ======================================

function findConflicts() {

    const issues = [];

    const seen = new Set();


    data.timetable.forEach(item => {

        const base = `${item.day}|${item.period}`;


        const resources = [

            [
                `faculty|${item.facultyId}`,
                `Faculty ${item.faculty}`
            ],

            [
                `batch|${item.batchId}`,
                `Batch ${item.batchName}`
            ],

            [
                `room|${item.roomId}`,
                `Room ${item.room}`
            ]

        ];


        resources.forEach(([resource, label]) => {

            const key = `${base}|${resource}`;


            if (seen.has(key)) {

                issues.push(

                    `${label} is assigned more than once on ${item.day}, ${PERIODS[item.period].label}.`

                );

            }


            seen.add(key);

        });

    });


    return issues;

}


// ======================================
// 13. CONFLICT CHECKER PAGE
// ======================================

function renderConflicts() {

    const issues = findConflicts();

    const hasSchedule = data.timetable.length > 0;


    document.getElementById("appContent").innerHTML = `

        ${pageHeading(
            "Conflict Checker",
            "Validate faculty, batch and classroom assignments."
        )}


        <section class="panel">


            <div class="panel-head">

                <div>

                    <h2>Timetable Validation</h2>

                    <p>
                        Checks whether the same resource is
                        assigned to two classes at the same time.
                    </p>

                </div>


                <span class="pill">
                    ${issues.length} ISSUE(S)
                </span>

            </div>


            ${!hasSchedule ? `

                <div class="empty-state">

                    There is no timetable to validate yet.

                    <br><br>

                    <button class="btn" data-page="generate">
                        Generate a timetable
                    </button>

                </div>

            ` : issues.length ? `

                <div class="info-strip"
                     style="background:#fff4f4;
                            border-color:#f5dddd;
                            color:#a94450">

                    <strong>!</strong>

                    <span>
                        Conflicts found.
                        Review the issues below and update the sample data.
                    </span>

                </div>


                <ul class="issue-list">

                    ${issues.map(issue => `

                        <li>${escapeHTML(issue)}</li>

                    `).join("")}

                </ul>

            ` : `

                <div class="success-state">

                    <div class="success-icon">
                        ✓
                    </div>

                    <h2>No Scheduling Conflicts Found</h2>

                    <p>
                        Faculty members, student batches and
                        classrooms are not double-booked
                        in this sample timetable.
                    </p>

                </div>

            `}


            <div class="form-actions">

                <button class="btn"
                        data-action="check-conflicts">

                    ↻ Run Check Again

                </button>


                <button class="btn secondary"
                        data-page="timetable">

                    View Timetable

                </button>

            </div>


        </section>


        <style>

            .issue-list {
                padding: 15px 25px;
                color: #a94450;
                font-size: 11px;
                line-height: 2;
            }

            .success-state {
                text-align: center;
                padding: 35px 10px;
            }

            .success-icon {
                height: 52px;
                width: 52px;
                margin: auto;
                border-radius: 50%;
                background: #e8f8f1;
                color: #15956f;
                display: grid;
                place-items: center;
                font-size: 27px;
            }

            .success-state h2 {
                font-size: 18px;
                margin: 13px 0 7px;
                color: #16855e;
            }

            .success-state p {
                font-size: 11px;
                color: #8b90a0;
            }

        </style>

    `;

}


// ======================================
// 14. MANAGEMENT PAGE CONFIGURATION
// ======================================

const config = {

    faculty: {
        title: "Faculty",
        subtitle: "Manage college faculty members and departments.",
        singular: "Faculty Member"
    },

    subjects: {
        title: "Subjects",
        subtitle: "Manage subjects, subject codes and assigned faculty.",
        singular: "Subject"
    },

    batches: {
        title: "Student Batches",
        subtitle: "Manage student groups, semesters and class strength.",
        singular: "Student Batch"
    },

    rooms: {
        title: "Classrooms",
        subtitle: "Manage rooms, capacities and classroom types.",
        singular: "Classroom"
    }

};


// ======================================
// 15. MANAGEMENT TABLES
// ======================================

function renderManage(type) {

    const records = data[type];

    const cfg = config[type];

    let headers = [];

    let rows = "";


    // FACULTY TABLE

    if (type === "faculty") {

        headers = [
            "NAME",
            "EMAIL",
            "DEPARTMENT",
            "ACTION"
        ];


        rows = records.map(record => `

            <tr>

                <td class="td-strong">
                    ${escapeHTML(record.name)}
                </td>

                <td>
                    ${escapeHTML(record.email)}
                </td>

                <td>
                    ${escapeHTML(record.department)}
                </td>

                <td>

                    <button class="btn danger small"
                            data-action="delete-record"
                            data-type="${type}"
                            data-id="${record.id}">

                        Delete

                    </button>

                </td>

            </tr>

        `).join("");

    }


    // SUBJECT TABLE

    else if (type === "subjects") {

        headers = [
            "SUBJECT",
            "CODE",
            "FACULTY",
            "BATCH",
            "ACTION"
        ];


        rows = records.map(record => {

            const faculty = data.faculty.find(

                item => item.id === Number(record.facultyId)

            );

            const batch = data.batches.find(

                item => item.id === Number(record.batchId)

            );


            return `

                <tr>

                    <td class="td-strong">
                        ${escapeHTML(record.name)}
                    </td>

                    <td>
                        ${escapeHTML(record.code)}
                    </td>

                    <td>
                        ${escapeHTML(faculty?.name || "Not assigned")}
                    </td>

                    <td>
                        ${escapeHTML(batch?.name || "Not assigned")}
                    </td>

                    <td>

                        <button class="btn danger small"
                                data-action="delete-record"
                                data-type="${type}"
                                data-id="${record.id}">

                            Delete

                        </button>

                    </td>

                </tr>

            `;

        }).join("");

    }


    // BATCH TABLE

    else if (type === "batches") {

        headers = [
            "BATCH",
            "SEMESTER",
            "STUDENT STRENGTH",
            "ACTION"
        ];


        rows = records.map(record => `

            <tr>

                <td class="td-strong">
                    ${escapeHTML(record.name)}
                </td>

                <td>
                    ${escapeHTML(record.semester)}
                </td>

                <td>
                    ${record.strength}
                </td>

                <td>

                    <button class="btn danger small"
                            data-action="delete-record"
                            data-type="${type}"
                            data-id="${record.id}">

                        Delete

                    </button>

                </td>

            </tr>

        `).join("");

    }


    // CLASSROOM TABLE

    else {

        headers = [
            "ROOM",
            "CAPACITY",
            "ROOM TYPE",
            "ACTION"
        ];


        rows = records.map(record => `

            <tr>

                <td class="td-strong">
                    ${escapeHTML(record.name)}
                </td>

                <td>
                    ${record.capacity}
                </td>

                <td>
                    ${escapeHTML(record.type)}
                </td>

                <td>

                    <button class="btn danger small"
                            data-action="delete-record"
                            data-type="${type}"
                            data-id="${record.id}">

                        Delete

                    </button>

                </td>

            </tr>

        `).join("");

    }


    // DISPLAY PAGE

    document.getElementById("appContent").innerHTML = `

        ${pageHeading(
            cfg.title,
            cfg.subtitle,
            `<span class="pill">${records.length} RECORDS</span>`
        )}


        <div class="split-layout">


            <section class="panel">

                <div class="panel-head">

                    <div>

                        <h2>${cfg.title} Directory</h2>

                        <p>
                            Sample information used by the demo scheduler.
                        </p>

                    </div>

                </div>


                <div class="table-wrap">

                    <table>

                        <thead>

                            <tr>

                                ${headers.map(header => `

                                    <th>${header}</th>

                                `).join("")}

                            </tr>

                        </thead>


                        <tbody>

                            ${rows || `

                                <tr>

                                    <td colspan="${headers.length}">

                                        <div class="empty-state">
                                            No records yet.
                                            Add your first record using the form.
                                        </div>

                                    </td>

                                </tr>

                            `}

                        </tbody>

                    </table>

                </div>

            </section>


            <section class="panel">

                <div class="panel-head">

                    <div>

                        <h2>Add ${cfg.singular}</h2>

                        <p>
                            New records are saved in this browser.
                        </p>

                    </div>

                </div>


                <form id="recordForm"
                      data-type="${type}">

                    ${formFields(type)}


                    <div class="form-actions">

                        <button class="btn" type="submit">

                            ＋ Add ${cfg.singular}

                        </button>

                    </div>

                </form>

            </section>


        </div>

    `;

}


// ======================================
// 16. ADD RECORD FORMS
// ======================================

function formFields(type) {


    // ADD FACULTY

    if (type === "faculty") {

        return `

            <div class="field">

                <label>FULL NAME</label>

                <input name="name"
                       required
                       placeholder="e.g. Neha Gupta">

            </div>


            <div class="field">

                <label>EMAIL</label>

                <input name="email"
                       type="email"
                       placeholder="name@college.edu">

            </div>


            <div class="field">

                <label>DEPARTMENT</label>

                <input name="department"
                       required
                       placeholder="Computer Science">

            </div>

        `;

    }


    // ADD BATCH

    if (type === "batches") {

        return `

            <div class="field">

                <label>BATCH NAME</label>

                <input name="name"
                       required
                       placeholder="e.g. CSE-C">

            </div>


            <div class="field">

                <label>SEMESTER</label>

                <input name="semester"
                       required
                       placeholder="Semester 4">

            </div>


            <div class="field">

                <label>STUDENT STRENGTH</label>

                <input name="strength"
                       type="number"
                       min="1"
                       value="40"
                       required>

            </div>

        `;

    }


    // ADD CLASSROOM

    if (type === "rooms") {

        return `

            <div class="field">

                <label>ROOM NAME</label>

                <input name="name"
                       required
                       placeholder="e.g. Room 301">

            </div>


            <div class="field">

                <label>CAPACITY</label>

                <input name="capacity"
                       type="number"
                       min="1"
                       value="60"
                       required>

            </div>


            <div class="field">

                <label>ROOM TYPE</label>

                <select name="type">

                    <option>Classroom</option>

                    <option>Computer Lab</option>

                    <option>Laboratory</option>

                    <option>Seminar Hall</option>

                </select>

            </div>

        `;

    }


    // ADD SUBJECT

    return `

        <div class="field">

            <label>SUBJECT NAME</label>

            <input name="name"
                   required
                   placeholder="e.g. Artificial Intelligence">

        </div>


        <div class="field">

            <label>SUBJECT CODE</label>

            <input name="code"
                   required
                   placeholder="CS406">

        </div>


        <div class="field">

            <label>ASSIGN FACULTY</label>

            <select name="facultyId" required>

                ${data.faculty.map(faculty => `

                    <option value="${faculty.id}">
                        ${escapeHTML(faculty.name)}
                    </option>

                `).join("")}

            </select>

        </div>


        <div class="field">

            <label>ASSIGN BATCH</label>

            <select name="batchId" required>

                ${data.batches.map(batch => `

                    <option value="${batch.id}">
                        ${escapeHTML(batch.name)}
                    </option>

                `).join("")}

            </select>

        </div>

    `;

}


// ======================================
// 17. ADD NEW RECORD
// ======================================

function addRecord(form) {

    const type = form.dataset.type;


    const values = Object.fromEntries(

        new FormData(form).entries()

    );


    const id = Math.max(

        0,
        ...data[type].map(item => Number(item.id))

    ) + 1;


    let record;


    if (type === "faculty") {

        record = {

            id,

            name: values.name.trim(),

            email: values.email.trim(),

            department: values.department.trim()

        };

    }


    else if (type === "batches") {

        record = {

            id,

            name: values.name.trim(),

            semester: values.semester.trim(),

            strength: Number(values.strength)

        };

    }


    else if (type === "rooms") {

        record = {

            id,

            name: values.name.trim(),

            capacity: Number(values.capacity),

            type: values.type

        };

    }


    else {

        record = {

            id,

            name: values.name.trim(),

            code: values.code.trim(),

            facultyId: Number(values.facultyId),

            batchId: Number(values.batchId)

        };

    }


    data[type].push(record);


    // Old timetable must be regenerated

    data.timetable = [];

    data.generatedAt = null;


    saveData();


    showToast(

        `${config[type].singular} added. Generate a fresh timetable to include it.`

    );


    renderManage(type);

}


// ======================================
// 18. DELETE RECORD
// ======================================

function deleteRecord(type, id) {

    const record = data[type].find(item =>

        Number(item.id) === Number(id)

    );


    if (!record) return;


    if (!confirm(`Delete "${record.name}"?`)) return;


    // Prevent deleting assigned faculty

   if (type === "faculty") {

    // Remove faculty assignment from all subjects
    data.subjects.forEach(subject => {

        if (Number(subject.facultyId) === Number(id)) {
            subject.facultyId = null;
        }

    });

}


    // Prevent deleting a batch with assigned subjects

    if (

        type === "batches" &&

        data.subjects.some(subject =>

            Number(subject.batchId) === Number(id)

        )

    ) {

        showToast(
            "This batch has subjects assigned. Delete or reassign those subjects first."
        );

        return;

    }


    data[type] = data[type].filter(item =>

        Number(item.id) !== Number(id)

    );


    data.timetable = [];

    data.generatedAt = null;


    saveData();


    showToast("Record deleted.");


    renderManage(type);

}


// ======================================
// 19. EXPORT TIMETABLE AS CSV
// ======================================

function exportCSV() {

    if (!data.timetable.length) {

        showToast(
            "Generate a timetable before exporting."
        );

        return;

    }


    const rows = [

        [
            "Day",
            "Period",
            "Time",
            "Batch",
            "Subject",
            "Faculty",
            "Room"
        ],

        ...data.timetable.map(item => [

            item.day,

            PERIODS[item.period].label,

            PERIODS[item.period].time,

            item.batchName,

            item.subject,

            item.faculty,

            item.room

        ])

    ];


    const csv = rows.map(row =>

        row.map(value =>

            `"${String(value).replace(/"/g, '""')}"`

        ).join(",")

    ).join("\n");


    const url = URL.createObjectURL(

        new Blob(
            [csv],
            {type: "text/csv;charset=utf-8;"}
        )

    );


    const link = document.createElement("a");

    link.href = url;

    link.download = "CampusFlow_Weekly_Timetable.csv";

    link.click();


    URL.revokeObjectURL(url);


    showToast("Timetable CSV downloaded.");

}


// ======================================
// 20. BUTTON CLICK EVENTS
// ======================================

document.addEventListener("click", event => {


    // Navigation buttons

    const pageButton = event.target.closest("[data-page]");

    if (pageButton) {

        event.preventDefault();

        setPage(pageButton.dataset.page);

        return;

    }


    // Action buttons

    const actionButton = event.target.closest("[data-action]");

    if (!actionButton) return;


    const action = actionButton.dataset.action;


    // Generate timetable

    if (action === "generate") {

        generateTimetable();

    }


    // Export CSV

    if (action === "export") {

        exportCSV();

    }


    // Check conflicts

    if (action === "check-conflicts") {

        const issues = findConflicts();


        showToast(

            issues.length

                ? `${issues.length} conflict(s) found.`

                : "Validation complete. No conflicts found."

        );


        renderConflicts();

    }


    // Delete records

    if (action === "delete-record") {

        deleteRecord(

            actionButton.dataset.type,

            actionButton.dataset.id

        );

    }

});


// ======================================
// 21. FORM SUBMISSION
// ======================================

document.addEventListener("submit", event => {

    if (event.target.id === "recordForm") {

        event.preventDefault();

        addRecord(event.target);

    }

});


// ======================================
// 22. BATCH FILTER
// ======================================

document.addEventListener("change", event => {

    if (event.target.id === "batchFilter") {

        selectedBatchId = Number(event.target.value);

        renderTimetable();

    }

});


// ======================================
// 23. MOBILE SIDEBAR
// ======================================

document.getElementById("mobileMenu").addEventListener(
    "click",
    () => {

        document.getElementById("sidebar")
            .classList.toggle("open");

    }
);


// ======================================
// 24. START APPLICATION
// ======================================

renderDashboard();


// 24. START APPLICATION

renderDashboard();


// ======================================
// 24. LIGHT AND DARK MODE
// ======================================

const themeToggle = document.getElementById("themeToggle");


// Apply selected theme

function applyTheme(theme, save = true) {

    const darkMode = theme === "dark";

    // Change website theme

    document.body.dataset.theme = theme;


    // Update button appearance

    themeToggle.innerHTML = darkMode

        ? `
            <span class="theme-icon">☀</span>
            <span class="theme-label">Light Mode</span>
          `

        : `
            <span class="theme-icon">☾</span>
            <span class="theme-label">Dark Mode</span>
          `;


    // Update accessibility label

    themeToggle.setAttribute(
        "aria-label",
        darkMode ? "Switch to light mode" : "Switch to dark mode"
    );


    // Save selected theme

    if (save) {

        localStorage.setItem(
            "campusflow-theme",
            theme
        );

    }

}


// Toggle theme when button is clicked

themeToggle.addEventListener("click", function() {

    const currentTheme = document.body.dataset.theme;

    const newTheme = currentTheme === "dark"
        ? "light"
        : "dark";

    applyTheme(newTheme);

});


// Load previously selected theme

const savedTheme = localStorage.getItem("campusflow-theme") || "light";

applyTheme(savedTheme, false);


// ======================================
// 25. START APPLICATION
// ======================================

renderDashboard();
