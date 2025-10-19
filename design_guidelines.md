# SkillSphere Design Guidelines

## Design Approach

**Hybrid Reference-Based System** drawing from professional platforms with distinct modules:
- **LinkedIn** (networking/profiles): Clean, professional aesthetic with blue accents
- **Notion/Linear** (dashboard organization): Card-based layouts with excellent hierarchy
- **Udemy** (learning platform): Clear course cards with progress indicators
- **Upwork** (freelancing): Job listings with structured information display

This platform requires a professional yet approachable design that balances utility (job search, learning) with engagement (networking, competitions).

## Core Design Elements

### A. Color Palette

**Light Mode:**
- Primary: 210 100% 45% (Professional blue - trust, stability)
- Surface: 210 20% 98% (Off-white cards)
- Text Primary: 220 15% 20%
- Text Secondary: 220 10% 55%

**Dark Mode:**
- Primary: 210 100% 55% (Brighter blue for dark backgrounds)
- Background: 220 20% 8%
- Surface: 220 15% 12% (Card backgrounds)
- Text Primary: 210 15% 95%
- Text Secondary: 210 10% 70%

**Accent Colors:**
- Success: 145 65% 45% (Course completion, job acceptance)
- Warning: 35 90% 55% (Competition deadlines)
- Info: 200 80% 50% (Notifications, tips)

### B. Typography

**Font Families:**
- Primary: 'Inter' (clean, professional for all body text and UI)
- Headings: 'Inter' with varied weights (600-700 for emphasis)

**Type Scale:**
- Hero/Display: text-4xl to text-6xl, font-semibold
- Section Headers: text-3xl, font-semibold
- Card Titles: text-xl, font-semibold
- Body: text-base, font-normal
- Captions/Meta: text-sm, text-secondary

### C. Layout System

**Spacing Primitives:** Use Tailwind units of 2, 4, 6, 8, 12, 16, 20 for consistent rhythm
- Component padding: p-4 to p-6
- Section spacing: py-12 to py-20
- Card gaps: gap-4 to gap-6
- Container max-width: max-w-7xl with px-4

**Grid Systems:**
- Job/Course listings: grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6
- Dashboard widgets: grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4
- Profile sections: Two-column layout (sidebar + main content)

### D. Component Library

**Navigation:**
- Sticky top navigation with logo, main links, user avatar dropdown
- Secondary navigation tabs for module switching (Jobs, Network, Learn, Compete, Portfolio)
- Breadcrumbs for deep navigation (Course > Module > Lesson)

**Cards:**
- Elevated cards with subtle shadow (shadow-sm hover:shadow-md transition)
- Rounded corners: rounded-lg
- Job cards: Image/company logo, title, meta (pay, location, posted date), tags, apply button
- Course cards: Thumbnail, title, instructor, rating, price/enroll button, progress bar
- Competition cards: Challenge title, difficulty badge, participant count, deadline timer

**Forms:**
- Grouped input fields with labels above
- Consistent spacing (space-y-4 for form groups)
- Primary submit buttons (full-width on mobile)
- Helper text below inputs for validation feedback

**Data Display:**
- Tables for admin panels (striped rows, hover states)
- Leaderboard: Rank number, avatar, username, score with position highlighting (gold/silver/bronze top 3)
- Progress indicators: Multi-step bars for course progress, profile completion
- Stats cards: Large number display with icon and label

**Feeds & Social:**
- Post cards with avatar, username, timestamp, content, action buttons (like, comment, share)
- Comment threads with indentation
- Connection requests with accept/decline actions

**Overlays:**
- Modals: Centered, max-w-2xl, backdrop blur
- Drawers: Slide-in from right for notifications, messages
- Tooltips: Dark background with arrow pointer

### E. Module-Specific Design Patterns

**Freelancing Hub:**
- Filter sidebar (collapsible on mobile) with checkboxes for skills, budget, location
- Job detail page: Two-column (job description + application form/sidebar)
- Application tracking: Timeline view with status indicators

**Professional Network:**
- Feed layout: Central content column (max-w-2xl) with sticky profile summary
- Profile pages: Header banner with avatar overlay, tabbed content (About, Experience, Skills, Portfolio)

**Learning Platform:**
- Course player: Video player with sidebar table of contents
- Quiz interface: Question cards with radio buttons, progress indicator, timed challenges
- Certificate display: Decorative border, logo, achievement details

**Competitions:**
- Grid of challenge cards with difficulty badges (Easy/Medium/Hard in distinct colors)
- Submission form: Code editor mockup or file upload zone
- Live leaderboard: Auto-updating positions with smooth transitions

**Portfolio Builder:**
- Drag-and-drop project cards (visual indication of draggable state)
- Public portfolio: Hero section with name/title, project grid, skills tag cloud, downloadable resume button

**Admin Panel:**
- Dashboard with KPI cards (users, active jobs, revenue - large numbers with trend indicators)
- Data tables with bulk actions, search, filter controls
- Content moderation: Preview cards with approve/reject quick actions

## Images

**Hero Images:**
- Homepage: Abstract illustration of connected professionals collaborating (1920x800px) - vibrant but professional
- Learning section: Students/professionals engaging with digital content
- Freelancing hub: Diverse professionals working on laptops

**Profile/Avatar Images:**
- User avatars: Circular, consistent sizing (40px standard, 80px profile page, 24px in comments)
- Default avatars: Gradient backgrounds with initials for users without photos

**Content Images:**
- Course thumbnails: 16:9 ratio, showing subject matter or instructor
- Company logos: Square containers with padding, maintain aspect ratio
- Project screenshots: Variable aspect ratios in portfolio, lazy-loaded

**Icon System:**
Use **Heroicons (outline)** via CDN for consistent, professional icon set throughout
- Navigation icons: 24px
- Action buttons: 20px
- List items: 16px

## Interaction & Animation

**Use sparingly - only for meaningful feedback:**
- Hover states: Subtle scale (scale-105) on cards, color transitions on buttons
- Loading states: Skeleton screens for content-heavy pages, spinner for actions
- Transitions: 200ms duration for most interactions
- Page transitions: Fade between routes (avoid heavy animations)

## Accessibility & Consistency

- Maintain WCAG AA contrast ratios in both light and dark modes
- Focus indicators: 2px ring with primary color offset
- Dark mode implementation across all components including forms, modals, tables
- Keyboard navigation support for all interactive elements