import React, { useState } from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { ChevronLeft, ChevronRight, Users, BookOpen, Calendar as CalendarIcon, DollarSign, Trophy, Bell, Book, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

// Utility Components
const Card = ({ className = '', children }) => (
  <div className={`bg-white rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl ${className}`}>
    {children}
  </div>
);

const CardHeader = ({ children }) => (
  <div className="p-4 border-b border-gray-100">{children}</div>
);

const CardTitle = ({ children }) => (
  <h2 className="text-lg font-semibold text-gray-800">{children}</h2>
);

const CardContent = ({ className = '', children }) => (
  <div className={`p-4 ${className}`}>{children}</div>
);

const CustomCalendar = ({ selected, onSelect, events = [] }) => {
  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const days = getDaysInMonth(selected);
  const firstDay = getFirstDayOfMonth(selected);
  const weeks = Math.ceil((days + firstDay) / 7);

  const hasEvent = (dayNumber) => {
    const currentDate = new Date(selected);
    currentDate.setDate(dayNumber);
    return events.some(event => new Date(event.date).toDateString() === currentDate.toDateString());
  };

  return (
    <div className="w-full">
      <div className="grid grid-cols-7 gap-1">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div key={day} className="p-2 text-sm font-medium text-gray-600 text-center">
            {day}
          </div>
        ))}
        {Array.from({ length: weeks * 7 }).map((_, index) => {
          const dayNumber = index - firstDay + 1;
          const isCurrentMonth = dayNumber > 0 && dayNumber <= days;
          const isSelected = selected && dayNumber === selected.getDate();
          const eventDay = isCurrentMonth && hasEvent(dayNumber);

          return (
            <div
              key={index}
              className={`relative p-2 text-sm cursor-pointer transition-colors duration-200
                ${isCurrentMonth ? 'hover:bg-blue-50' : 'text-gray-300'}
                ${isSelected ? 'bg-blue-100 text-blue-800' : ''}
                ${eventDay ? 'font-semibold' : ''} text-center`}
              onClick={() => {
                if (isCurrentMonth) {
                  const newDate = new Date(selected);
                  newDate.setDate(dayNumber);
                  onSelect(newDate);
                }
              }}
            >
              {isCurrentMonth && (
                <>
                  {dayNumber}
                  {eventDay && (
                    <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-blue-500 rounded-full" />
                  )}
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

const Dashboard = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  
  // Sample data
  const attendanceData = [
    { name: 'Present', value: 85, color: '#10B981' },
    { name: 'Late', value: 5, color: '#F59E0B' },
    { name: 'Absent', value: 10, color: '#EF4444' }
  ];

  const performanceData = [
    { subject: 'Math', score: 85 },
    { subject: 'Science', score: 92 },
    { subject: 'English', score: 78 },
    { subject: 'History', score: 88 },
    { subject: 'Art', score: 95 }
  ];

  const events = [
    { id: 1, title: 'Final Exams', date: '2024-01-15', type: 'exam' },
    { id: 2, title: 'Sports Day', date: '2024-01-20', type: 'event' },
    { id: 3, title: 'Science Fair', date: '2024-01-25', type: 'event' }
  ];

  const stats = [
    { icon: Users, label: 'Total Students', value: '500', color: 'bg-blue-500' },
    { icon: BookOpen, label: 'New Admissions', value: '45', color: 'bg-green-500' },
    { icon: BookOpen, label: 'Active Courses', value: '30', color: 'bg-green-400' }, 
    { icon: Bell, label: 'Student Satisfaction', value: '92%', color: 'bg-teal-500' } 
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">Student Management Dashboard</h1>
            {/* Removed notification and user icons */}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="transform hover:-translate-y-1">
              <CardContent>
                <div className="flex items-center">
                  <div className={`${stat.color} p-3 rounded-lg`}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm text-gray-500">{stat.label}</p>
                    <p className="text-xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Attendance Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Daily Attendance Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-center">
                <div className="relative">
                  <PieChart width={300} height={300}>
                    <Pie
                      data={attendanceData}
                      innerRadius={70}
                      outerRadius={90}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {attendanceData.map((entry, index) => (
                        <Cell key={index} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                    <div className="text-4xl font-bold text-gray-900">85%</div>
                    <div className="text-sm text-gray-500">Present Today</div>
                  </div>
                </div>
              </div>
              <div className="flex justify-center gap-6 mt-6">
                {attendanceData.map((item, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-sm text-gray-600">
                      {item.name}: {item.value}%
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Performance Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Academic Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <BarChart width={450} height={300} data={performanceData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <XAxis dataKey="subject" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="score" fill="#3B82F6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </CardContent>
          </Card>

          {/* Calendar */}
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Academic Calendar</CardTitle>
                <div className="flex items-center gap-2">
                  <ChevronLeft
                    className="w-5 h-5 cursor-pointer text-gray-600 hover:text-gray-900"
                    onClick={() => {
                      const newDate = new Date(selectedDate);
                      newDate.setMonth(newDate.getMonth() - 1);
                      setSelectedDate(newDate);
                    }}
                  />
                  <span className="text-sm font-medium">
                    {selectedDate.toLocaleString('default', {
                      month: 'long',
                      year: 'numeric',
                    })}
                  </span>
                  <ChevronRight
                    className="w-5 h-5 cursor-pointer text-gray-600 hover:text-gray-900"
                    onClick={() => {
                      const newDate = new Date(selectedDate);
                      newDate.setMonth(newDate.getMonth() + 1);
                      setSelectedDate(newDate);
                    }}
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <CustomCalendar
                selected={selectedDate}
                onSelect={setSelectedDate}
                events={events}
              />
              <div className="mt-4">
                {events.map(event => (
                  <div key={event.id} className="flex justify-between items-center border-b py-2">
                    <span className="text-sm text-gray-700">{event.title}</span>
                    <span className="text-sm text-gray-500">{new Date(event.date).toLocaleDateString()}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: Users, label: 'Students List', link: '/students', color: 'bg-blue-500' },
                  { icon: Book, label: 'Library', link: '/library', color: 'bg-green-500' },
                  { icon: Trophy, label: 'Assignments', link: '/assignments', color: 'bg-yellow-500' },
                  { icon: Clock, label: 'Timetable', link: '/timetable', color: 'bg-purple-500' },
                ].map((action, index) => (
                  <Link key={index} to={action.link}>
                    <div className="p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors duration-200">
                      <div className={`${action.color} w-10 h-10 rounded-lg flex items-center justify-center mb-3`}>
                        <action.icon className="w-5 h-5 text-white" />
                      </div>
                      <h3 className="text-sm font-medium text-gray-900">{action.label}</h3>
                      <p className="text-xs text-gray-500 mt-1">Manage {action.label.toLowerCase()}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
