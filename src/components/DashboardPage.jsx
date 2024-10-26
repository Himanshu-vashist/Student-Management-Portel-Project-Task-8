import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell } from 'recharts';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
// Simple Card components
const Card = ({ className = '', children }) => (
  <div className={`bg-white rounded-lg shadow-md ${className}`}>
    {children}
  </div>
);

const CardHeader = ({ children }) => (
  <div className="p-4 border-b">{children}</div>
);

const CardTitle = ({ children }) => (
  <h2 className="text-lg font-semibold">{children}</h2>
);

const CardContent = ({ className = '', children }) => (
  <div className={`p-4 ${className}`}>{children}</div>
);

// Simple Calendar component
const Calendar = ({ mode, selected, onSelect, className }) => {
  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month, 1).getDay();
  };

  const days = getDaysInMonth(selected);
  const firstDay = getFirstDayOfMonth(selected);
  const weeks = Math.ceil((days + firstDay) / 7);

  return (
    <div className={`${className}`}>
      <div className="grid grid-cols-7 gap-1 text-center">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="p-2 text-sm font-medium">{day}</div>
        ))}
        {Array.from({ length: weeks * 7 }).map((_, index) => {
          const dayNumber = index - firstDay + 1;
          const isCurrentMonth = dayNumber > 0 && dayNumber <= days;
          const isSelected = selected && dayNumber === selected.getDate();
          
          return (
            <div
              key={index}
              className={`p-2 text-sm cursor-pointer hover:bg-gray-100 ${
                isSelected ? 'bg-blue-100' : ''
              } ${isCurrentMonth ? '' : 'text-gray-300'}`}
              onClick={() => {
                if (isCurrentMonth) {
                  const newDate = new Date(selected);
                  newDate.setDate(dayNumber);
                  onSelect(newDate);
                }
              }}
            >
              {isCurrentMonth ? dayNumber : ''}
            </div>
          );
        })}
      </div>
    </div>
  );
};

// Dashboard Component
const Dashboard = () => {
  const [attendanceStats, setAttendanceStats] = useState({
    present: 0,
    absent: 0,
    late: 0
  });
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [stats, setStats] = useState({
    totalStudents: 0,
    newAdmissions: 0,
    enquiriesWeek: 0,
    enquiriesMonth: 0,
    totalRevenue: 0
  });

  // Rest of your existing Dashboard code remains the same
  const studentsData = {
    "students": [
      {
        "id": 1,
        "name": "John Doe",
        "course": "Computer Science",
        "attendance": "present",
        "date": "2024-01-15"
      },
      {
        "id": 2,
        "name": "Jane Smith",
        "course": "Data Science",
        "attendance": "absent",
        "date": "2024-01-15"
      }
    ],
    "events": [
      {
        "id": 1,
        "title": "New Year Holiday",
        "date": "2024-01-01",
        "type": "holiday"
      },
      {
        "id": 2,
        "title": "Class Test Exams",
        "date": "2024-01-15",
        "type": "exam"
      }
    ]
  };

  useEffect(() => {
    // Calculate attendance statistics
    const calculateAttendance = () => {
      const total = studentsData.students.length;
      const present = studentsData.students.filter(s => s.attendance === 'present').length;
      const absent = studentsData.students.filter(s => s.attendance === 'absent').length;
      const late = studentsData.students.filter(s => s.attendance === 'late').length;

      setAttendanceStats({
        present: (present / total) * 100,
        absent: (absent / total) * 100,
        late: (late / total) * 100
      });
    };

    // Calculate other statistics
    const calculateStats = () => {
      setStats({
        totalStudents: studentsData.students.length,
        newAdmissions: 500,
        enquiriesWeek: 1000,
        enquiriesMonth: 9000,
        totalRevenue: 100000
      });
    };

    calculateAttendance();
    calculateStats();
  }, []);

  const attendanceData = [
    { name: 'Present', value: attendanceStats.present, color: '#28a745' },
    { name: 'Late', value: attendanceStats.late, color: '#ffc107' },
    { name: 'Absent', value: attendanceStats.absent, color: '#dc3545' }
  ];

  const getEvents = (date) => {
    return studentsData.events.filter(event => {
      const eventDate = new Date(event.date);
      return eventDate.toDateString() === date.toDateString();
    });
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Student Management Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Attendance Section */}
        <Card>
          <CardHeader>
            <CardTitle>
              <div className="flex justify-between items-center">
                <span>Daily Attendance</span>
                
                <Link to="/attendance">
        <button className="bg-red-500 text-white px-4 py-2 rounded">
          View Attendance
        </button>
      </Link>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-center">
              <div className="relative">
                <PieChart width={250} height={250}>
                  <Pie
                    data={attendanceData}
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {attendanceData.map((entry, index) => (
                      <Cell key={index} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                  <div className="text-3xl font-bold">
                    {Math.round(attendanceStats.present)}%
                  </div>
                  <div className="text-sm text-gray-500">Present</div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-center gap-4 mt-4">
              {attendanceData.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                  <span>{item.name}: {Math.round(item.value)}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Calendar Section */}
        <Card>
          <CardHeader>
            <CardTitle>Academic Calendar</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-2">
                <ChevronLeft 
                  className="w-5 h-5 cursor-pointer" 
                  onClick={() => {
                    const newDate = new Date(selectedDate);
                    newDate.setMonth(newDate.getMonth() - 1);
                    setSelectedDate(newDate);
                  }}
                />
                <span>
                  {selectedDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
                </span>
                <ChevronRight 
                  className="w-5 h-5 cursor-pointer"
                  onClick={() => {
                    const newDate = new Date(selectedDate);
                    newDate.setMonth(newDate.getMonth() + 1);
                    setSelectedDate(newDate);
                  }}
                />
              </div>
            </div>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="rounded-md border"
            />
            <div className="mt-4 space-y-2">
              {studentsData.events.map((event, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div 
                    className={`w-2 h-2 rounded-full ${
                      event.type === 'holiday' ? 'bg-red-500' : 'bg-green-500'
                    }`}
                  ></div>
                  <span className="text-sm">{event.title}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mt-6">
        <Card>
          <CardContent className="p-4">
            <div className="text-sm text-gray-500">Total Students</div>
            <div className="text-2xl font-bold mt-1">{stats.totalStudents}</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-sm text-gray-500">New Admissions</div>
            <div className="text-2xl font-bold mt-1">{stats.newAdmissions}</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-sm text-gray-500">Weekly Enquiries</div>
            <div className="text-2xl font-bold mt-1">{stats.enquiriesWeek}</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-sm text-gray-500">Monthly Enquiries</div>
            <div className="text-2xl font-bold mt-1">{stats.enquiriesMonth}</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-sm text-gray-500">Total Revenue</div>
            <div className="text-2xl font-bold mt-1">${stats.totalRevenue.toLocaleString()}</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;