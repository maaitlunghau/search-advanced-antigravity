# Search Advanced Functionality

A modern, high-performance course search system featuring advanced suggestion logic and a premium user interface.

## 🚀 Technology Stack

| Layer | Technology |
| :--- | :--- |
| **Backend** | ASP.NET Web API |
| **Frontend** | NextJS + TailwindCSS |
| **Database** | MySQL |
| **Design** | Antigravity Premium UI |

---

## ✨ Core Features

### 🔍 Search & Discovery
- **Keyword Search**: Robust searching for courses by name and content.
- **Advanced Suggestions**:
    - Smart keyword recommendations based on input.
    - Direct item (Course) suggestions within the dropdown.
- **Debounce Logic**: Optimized API calls to reduce server load and improve performance.
- **Category Filtering**: Granular filtering for specific course categories.

### 📜 Search Logging & History
- **Frontend Logs**: Quick access using `localStorage`.
- **Backend Logs**: Persistent `search_logs` table in MySQL with periodic data cleaning.
- **Pre-Search States**:
    - User search history.
    - Trending/Hot keywords.
    - Featured/Recommended items.

---

## 🎨 UI/UX Components & Effects

### Frontend Components
1. **Layout**: Consistent Header and Footer.
2. **Search Ecosystem**: Integrated Search Bar + Suggestion Dropdown UI.
3. **Filtering**: Dedicated Filter bar for category selection.
4. **Display**: 
    - Premium Item Cards.
    - Comprehensive Search Results (Main List).
    - Tabular data view for all results.
5. **Detailing**: Dedicated Course Detail page.

### Premium Effects
- **Overlay**: Subtle grey backdrop when the suggestion UI is active to focus user attention.
- **Skeleton Loading**: Smooth skeleton animations while the Mini List is updating.

---

## 🛠️ Main Entity: Course
The primary data object managed across the system is the **Course** entity.

---

## 🏗️ Getting Started
*Instructions for setting up the environment and running the project locally.*

1. **Backend**: Open the solution in Visual Studio and update the MySQL connection string.
2. **Frontend**: `npm install` followed by `npm run dev`.
