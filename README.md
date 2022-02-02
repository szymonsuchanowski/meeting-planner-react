![Meeting Planner App screenshot](/assets/meeting-planner-mockup.png "Meeting Planner app screenshot")

&nbsp;

## 🔍 Overview

### What is Meeting Planner App?

Meeting Planner App is kind of **React callendar** with **local API** (JSON Server) as a database to manage meetings. The calendar is rendered from the database and contain a form to submit new meetings (form fields with hints created on previous meetings data saved in local API).

### Kanban Board App features

- **adding meetings** with the specification of:
    - name
    - last name
    - e-mail
    - date
    - time
    - fields of the form are validated
- **hints** for form fields based on previous meetings data
- **deleting tasks**
- renderd **meetings** are sorted by date
- **saving / deleting meeting using local API** (JSON Server)

&nbsp;

## 👨‍💻 Built with

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![JavaScript](https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)

&nbsp;

## ⚙️ Run Locally

The project uses [node](https://nodejs.org/en/) and [npm](https://www.npmjs.com/), follow the steps below to run it locally.

- Clone the project using

```bash
  git clone
```

- Go to the project directory and install dependencies

```bash
  npm i
```

- Run JSON Server

```bash
  npm run api
```

- Start developer mode

```bash
  npm start
```

- Meeting Planner App is ready to go:

    - site

        ```bash
        http://localhost:3000
        ```

    - meetings data (database)

        ```bash
        http://localhost:3005/meetings
        ```

&nbsp;

## 🔗 Useful resources

- [official React website](https://reactjs.org/docs/getting-started.html)
- [50 Gorgeous Color Schemes From Award-Winning Websites](https://visme-co.translate.goog/blog/website-color-schemes/?_x_tr_sl=en&_x_tr_tl=pl&_x_tr_hl=pl&_x_tr_pto=op,sc) - for design inspiration

&nbsp;

## 🙏 Special thanks

Special thanks to my [Mentor - devmentor.pl](https://devmentor.pl/) for providing me with the task and code review.