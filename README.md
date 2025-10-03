# Business Card App

**Author:** עדי ברנט  
**Project Type:** Node.js + Express API REST  
**Database:** MongoDB (Atlas / Local)

---

## מבוא ומטרות

בפרויקט זה נתנסה בבניית API REST בצד שרת.  
הפרויקט מאפשר למשתמשים עסקיים ולמשתמשים רגילים לנהל כרטיסי ביקור דיגיטליים: ליצור, לערוך, למחוק ולשלוף מידע.  

**מטרות עיקריות:**
- בניית צד שרת יציב ואמין ל-API REST.
- שימוש ב-MongoDB לניהול מידע.
- אימות וולידציה של נתונים עם Joi.
- אבטחת סיסמאות עם bcryptjs.
- שימוש ב-jsonwebtoken ליצירת טוקנים.
- ניהול לוגים עם Morgan.
- תמיכה ב-CORS וניהול סביבות עבודה (local / production).

---

## דרישות טכנולוגיות

- Node.js
- Express.js
- MongoDB (mongoose)
- bcryptjs
- Joi
- jsonwebtoken
- dotenv
- morgan
- cors

---

## מבנה API

### 1. Users

| No | URL             | Method | Authorization | Action                        | Return                         |
|----|----------------|--------|---------------|-------------------------------|--------------------------------|
| 1  | /users         | POST   | all           | Register user                 | Token                          |
| 2  | /users/login   | POST   | all           | Login user                     | Array of users                 |
| 3  | /users         | GET    | admin         | Get all registered users       | User list                      |
| 4  | /users/:id     | GET    | registered    | Get user                       | User data                      |
| 5  | /users/:id     | PUT    | registered    | Edit user / change isBusiness  | Updated user                   |
| 6  | /users/:id     | PATCH  | registered    | Delete user                     | Deleted user                   |
| 7  | /users/:id     | DELETE | registered/admin | Delete user                  | Deleted user                   |

### 2. Cards

| No | URL             | Method | Authorization | Action                      | Return                         |
|----|----------------|--------|---------------|-----------------------------|--------------------------------|
| 1  | /cards         | GET    | all           | Get all cards               | Array of cards                 |
| 2  | /cards/my-cards| GET    | registered    | Get user cards              | Array of user cards            |
| 3  | /cards/:id     | GET    | all           | Get specific card           | Card object                    |
| 4  | /cards         | POST   | Business user | Create new card             | Created card                   |
| 5  | /cards/:id     | PUT    | registered    | Edit card                   | Updated card                   |
| 6  | /cards/:id     | PATCH  | registered    | Like card                   | Updated card                   |
| 7  | /cards/:id     | DELETE | creator/admin | Delete card                 | Deleted card                   |

---

## Logger

- הספרייה `morgan` משמשת ליצירת לוגר שמדפיס בקונסול את כל הבקשות.
- פרטים שמודפסים: שעה, שיטת בקשה, URL, סטטוס תשובה, משך זמן תגובה.

---

## Cors

- מאפשר שליחת בקשות HTTP מכתובות מורשות בלבד.

---

## JSON

- האפליקציה מקבלת ומחזירה JSON בגוף הבקשות.

---

## Environments

- תמיכה בשתי סביבות עבודה:
  - Local
  - Production (MongoDB Atlas)

---

## HTTP Requests

- לכל בקשה מוחזר סטטוס מתאים והודעת שגיאה במידה ויש בעיה בהרשאות או בנתונים.

---

## Joi Validation

- כל אובייקט שמתקבל מהלקוח עובר ולידציה עם Joi.
- במידה והאובייקט לא תקין, מוחזרת תשובה עם סטטוס והודעת שגיאה.

---

## Bcryptjs

- סיסמאות של משתמשים מוצפנות לפני שמירה במסד.
- בהתחברות הסיסמה נבדקת מול הסיסמה המוצפנת במסד.

---

## JSON Web Token

- יצירת טוקן מוצפן עבור משתמשים.
- ה־payload כולל את המפתחות: `_id`, `isBusiness`, `isAdmin`.

---

## Initial Data

- יש ליצור 3 משתמשים:
  1. משתמש רגיל
  2. משתמש עסקי
  3. אדמין
- יש ליצור 3 כרטיסי ביקור ראשוניים.

---

## Mongoose Models

- יצירת מודלים של Users ו-Cards.
- לכל מודל יש את המפתחות הדרושים כפי שמופיעים בנספחים.

---

## הוראות הגשה

- להעלות את הפרויקט ל-GitHub (ללא תיקיית `node_modules`).
- לשלוח לינק לפרויקט דרך הקמפוס.
- הקובץ README.md צריך להסביר את הפרויקט, הפונקציונליות, ודרך התממשקות עם ה-API.

---

**Project Name:** Business Card App  
**Author:** עדי ברנט
