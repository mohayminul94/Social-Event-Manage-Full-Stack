'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Home() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch upcoming events from backend
    fetch('http://localhost:5000/api/events')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setEvents(data.slice(0, 3)); // Show top 3 upcoming events on home
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching events:', err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="space-y-12 pb-16">
      {/* Hero Section */}
      <section className="bg-emerald-700 text-white py-20 px-4 text-center rounded-b-3xl shadow-lg">
        <div className="max-w-3xl mx-auto space-y-6">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
            Empowering Communities Through Social Development
          </h1>
          <p className="text-lg md:text-xl text-emerald-100">
            Join local initiatives, participate in community service events, and make a meaningful impact together.
          </p>
          <div className="flex justify-center gap-4 pt-4">
            <Link
              href="/events"
              className="bg-white text-emerald-700 font-semibold px-6 py-3 rounded-lg shadow hover:bg-emerald-50 transition"
            >
              Explore Events
            </Link>
            <Link
              href="/events/create"
              className="border-2 border-white text-white font-semibold px-6 py-3 rounded-lg hover:bg-white/10 transition"
            >
              Create Event
            </Link>
          </div>
        </div>
      </section>

      {/* Featured / Upcoming Events Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white">
            Upcoming Social Events
          </h2>
          <Link
            href="/events"
            className="text-emerald-600 hover:text-emerald-700 font-medium dark:text-emerald-400"
          >
            View All →
          </Link>
        </div>

        {loading ? (
          <div className="text-center py-12 text-gray-500">Loading events...</div>
        ) : events.length === 0 ? (
          <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-xl shadow p-6">
            <p className="text-gray-600 dark:text-gray-400">No upcoming events found. Be the first to create one!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {events.map((event) => (
              <div
                key={event._id}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden border dark:border-gray-700 flex flex-col"
              >
                <img
                  src={event.thumbnail || "https://via.placeholder.com/400x200"}
                  alt={event.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6 flex flex-col flex-grow space-y-3">
                  <span className="text-xs font-semibold px-2.5 py-1 bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200 rounded-full w-max">
                    {event.eventType}
                  </span>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    {event.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                    {event.description}
                  </p>
                  <div className="pt-4 mt-auto border-t dark:border-gray-700 flex justify-between items-center text-xs text-gray-500 dark:text-gray-400">
                    <span>📍 {event.location}</span>
                    <span>📅 {new Date(event.eventDate).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}