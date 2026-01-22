# Product Requirements Document: TaskFlow

## Overview
TaskFlow is a simple task management application with a REST API backend and web frontend. Users can create, read, update, and delete tasks.

## Target Users
- Individual users who want to manage their daily tasks
- Small teams tracking shared todos

## Technical Stack

### Backend
- **Runtime**: Node.js 20+
- **Framework**: Express.js
- **Database**: SQLite (file-based, simple setup)
- **API Style**: RESTful JSON

### Frontend
- **Framework**: Vanilla JavaScript (no build step)
- **Styling**: CSS3 with modern features
- **Communication**: Fetch API to backend

## Features

### Phase 1: Core Backend API
- `POST /api/tasks` - Create a new task
- `GET /api/tasks` - List all tasks
- `GET /api/tasks/:id` - Get single task
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task

Task schema:
```json
{
  "id": "uuid",
  "title": "string (required, max 200 chars)",
  "description": "string (optional, max 1000 chars)",
  "status": "pending | in_progress | completed",
  "priority": "low | medium | high",
  "createdAt": "ISO timestamp",
  "updatedAt": "ISO timestamp"
}
```

### Phase 2: Frontend UI
- Task list view showing all tasks
- Task creation form
- Task editing modal
- Task deletion with confirmation
- Filter by status
- Sort by priority or date

### Phase 3: Polish & Testing
- Input validation (frontend & backend)
- Error handling with user-friendly messages
- Unit tests for API endpoints
- Basic integration test

## Non-Functional Requirements
- API response time < 100ms
- Works in Chrome, Firefox, Edge
- Mobile-responsive design
- No authentication required (local use)

## Success Criteria
- All CRUD operations work correctly
- Frontend reflects backend state accurately
- Tests pass with 80%+ coverage on core logic
