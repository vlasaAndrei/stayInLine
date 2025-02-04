-- schema.sql

CREATE TYPE recurrence_type AS ENUM (
    'daily',
    'interval',
    'weekly',
    'monthly',
    'specific',
    'none'
);

-- Projects table
CREATE TABLE projects (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    deadline TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Tasks table
CREATE TABLE tasks (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    deadline TIMESTAMPTZ,
    status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'done', 'abandoned', 'postponed')),
    project_id INTEGER REFERENCES projects(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    start_on TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    end_on TIMESTAMPTZ,
    recurrence_type recurrence_type DEFAULT 'none',
    recurrence_interval INTEGER,
    recurrence_weekdays INTEGER[],
    recurrence_day_of_month INTEGER,
    CONSTRAINT valid_interval 
        CHECK (recurrence_type != 'interval' OR (recurrence_interval IS NOT NULL AND recurrence_interval > 0)),
    CONSTRAINT valid_weekdays 
        CHECK (recurrence_type != 'weekly' OR recurrence_weekdays IS NOT NULL),
    CONSTRAINT valid_day_of_month 
        CHECK (recurrence_type != 'monthly' OR (recurrence_day_of_month IS NOT NULL AND recurrence_day_of_month BETWEEN 1 AND 31))
);
-- Useful indexes
CREATE INDEX idx_tasks_status ON tasks(status);
CREATE INDEX idx_tasks_project ON tasks(project_id);
CREATE INDEX idx_tasks_deadline ON tasks(deadline);
CREATE INDEX idx_projects_deadline ON projects(deadline);

-- Add trigger to update timestamps
CREATE OR REPLACE FUNCTION trigger_set_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add triggers to both tables
CREATE TRIGGER set_timestamp_tasks
    BEFORE UPDATE ON tasks
    FOR EACH ROW
    EXECUTE FUNCTION trigger_set_timestamp();

CREATE TRIGGER set_timestamp_projects
    BEFORE UPDATE ON projects
    FOR EACH ROW
    EXECUTE FUNCTION trigger_set_timestamp();

-- Comments
/*
To apply this schema:
psql -d inline_app -f schema.sql

For project statistics, you can use queries like:

-- Get task counts by status for a project:
SELECT status, COUNT(*) 
FROM tasks 
WHERE project_id = [project_id] 
GROUP BY status;

-- Get completion percentage:
SELECT 
    COUNT(CASE WHEN status = 'done' THEN 1 END)::float / COUNT(*)::float * 100 as completion_percentage
FROM tasks 
WHERE project_id = [project_id];
*/