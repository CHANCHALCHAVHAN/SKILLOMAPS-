# ✨ Skill Maps

> **Your career. Your path. Your growth.**

An AI-powered personalized learning and career navigator that understands a learner's goals, skills, interests, experience, and progress — then creates a learning path and adapts it over time.

---

## 🚀 What is Skill Maps?

Skill Maps helps students answer:

**Where am I? → Where do I want to go? → What should I do next?**

Instead of giving everyone the same courses, Skill Maps analyzes the learner and creates a personalized journey with skills, projects, assessments, and weekly milestones.

---

## 📑 Quick Navigation
<img width="1294" height="994" alt="image" src="https://github.com/user-attachments/assets/1e5d8789-de90-4c46-9e71-eb13c06eb8d1" />

<img width="1328" height="983" alt="image" src="https://github.com/user-attachments/assets/a26c7dc5-1b88-4485-b9cf-c4399e8c38ef" />

<img width="926" height="901" alt="image" src="https://github.com/user-attachments/assets/84f39d73-8783-4ca9-8edf-e050fa35d3e1" />

<img width="1295" height="761" alt="image" src="https://github.com/user-attachments/assets/fd86fd2f-9cc9-4472-8561-2a32c85fc03b" />

<img width="946" height="920" alt="image" src="https://github.com/user-attachments/assets/62521221-07d8-462a-9eb6-26ceb9b789a4" />


# 🌟 1. Landing Page

The landing page introduces Skill Maps and explains how it helps students choose and build their career path.

### Features

- Simple and clean introduction
- Skill Maps branding
- Career-focused messaging
- Login / Signup entry point

### 📸 Screenshots

| Landing Page | Main Hero | Mobile View |
|---|---|---|
| ![Landing](./screenshots/landing-1.png) | ![Hero](./screenshots/landing-2.png) | ![Mobile](./screenshots/landing-3.png) |

<details>
<summary>💡 View Feature Details</summary>

The landing page is designed to quickly explain the purpose of Skill Maps without overwhelming the user.

</details>

---

# 🔐 2. Login & Signup

Students can create an account and access their personalized learning environment.

### Features

- Login
- Signup
- Logout
- Password validation
- Protected user experience

### 📸 Screenshots

| Login | Signup | User Session |
|---|---|---|
| ![Login](./screenshots/login.png) | ![Signup](./screenshots/signup.png) | ![Session](./screenshots/session.png) |

<details>
<summary>🔎 How it works</summary>

The user signs up or logs in and then enters their personalized Skill Maps dashboard.

</details>

---

# 🏠 3. Home Dashboard

The home page focuses on one question:

> **Where do you want to go next?**

### Main Actions

### 🎯 Create Career Path
Build a personalized roadmap toward a target career.

### 🤔 I'm Confused
Get AI help when the learner is unsure about their career or learning direction.

### 📊 Dashboard Shows

- Career goal
- Current progress
- Next step
- Weekly milestones
- AI recommendation
- AI mentor

### 📸 Screenshots

| Home Dashboard | Progress | Weekly Milestones |
|---|---|---|
| ![Home](./screenshots/home.png) | ![Progress](./screenshots/home-progress.png) | ![Weekly](./screenshots/home-weekly.png) |

---

# 🔗 4. Connect Profiles

Students can connect external platforms so Skill Maps can better understand their real-world experience.

### Supported Profiles

- GitHub
- LinkedIn
- LeetCode
- HackerRank

### Profile Information Can Help Identify

- Programming languages
- Projects
- Coding activity
- Skills
- Experience
- Achievements

### 📸 Screenshots

| Connect Profiles | Connected Accounts | Profile Insights |
|---|---|---|
| ![Connect](./screenshots/connect.png) | ![Connected](./screenshots/connected.png) | ![Insights](./screenshots/profile-insights.png) |

<details>
<summary>🔗 Profile Integration Flow</summary>
GitHub
LinkedIn
LeetCode
HackerRank
      ↓
Skill Maps
      ↓
Learner Profile
      ↓
Skill Analysis
</details>
🎯 5. Create Career Path

The student tells Skill Maps what they want to achieve.

Example
Career: Data Engineer
Timeline: 6 months
Learning Time: 6 hours/week

Skill Maps then creates a personalized roadmap.

🤔 6. I'm Confused

A simple AI decision-support feature.

Students Can Ask
Which career should I choose?
Which programming language should I focus on?
What am I good at?
What should I learn next?
<details> <summary>💡 Example</summary>
  ```text
  Student:
Which language should I focus on?

AI:
Python is the best fit for your current path
because your goal is AI Engineering and your
existing projects already use Python.
</details>

System Flow 
                ┌───────────────┐
                │    Student    │
                └───────┬───────┘
                        ↓
             ┌────────────────────┐
             │ Goal + Preferences │
             └─────────┬──────────┘
                       ↓
          ┌──────────────────────────┐
          │ Connected Profiles       │
          │ GitHub / LinkedIn / etc. │
          └────────────┬─────────────┘
                       ↓
              ┌─────────────────┐
              │ Learner Profile │
              └────────┬────────┘
                       ↓
              ┌─────────────────┐
              │ Skill Gap       │
              │ Analysis        │
              └────────┬────────┘
                       ↓
              ┌─────────────────┐
              │ Skill Graph     │
              └────────┬────────┘
                       ↓
              ┌─────────────────┐
              │ Personalized    │
              │ Learning Path   │
              └────────┬────────┘
                       ↓
        ┌──────────────┼───────────────┐
        ↓              ↓               ↓
     Courses        Projects       Assessments
        └──────────────┼───────────────┘
                       ↓
                  Weekly Goals
                       ↓
                  Progress
                       ↓
                    Feedback
                       ↓
                AI Replanning
                       ↓
                Next Best Action

                
