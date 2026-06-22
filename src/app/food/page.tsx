import { PublicLayout } from "@/components/layout/PublicLayout";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";

export const metadata = {
  title: "Mess & Food",
  description: "Weekly food menu, breakfast, lunch, and dinner schedule for Sri Siva Ganesh Boys Hostel.",
};

const breakfastSchedule = [
  { day: "Sunday", item: "Gaare", icon: "🍩" },
  { day: "Monday", item: "Dosa", icon: "🥞" },
  { day: "Tuesday", item: "Idli", icon: "🥟" },
  { day: "Wednesday", item: "Punugulu", icon: "🧆" },
  { day: "Thursday", item: "Poori", icon: "🌮" },
  { day: "Friday", item: "Uthappa", icon: "🫓" },
  { day: "Saturday", item: "Mysore Bonda", icon: "🍘" },
];

const dinnerSchedule = [
  { day: "Sunday", items: ["Chicken Curry", "Veg Curry", "Sambar", "Curd"] },
  { day: "Monday", items: ["Veg Curry", "Sambar", "Curd", "Special Sweet"] },
  { day: "Tuesday", items: ["Chapati", "Boiled Egg", "Veg Curry", "Sambar", "Curd"] },
  { day: "Wednesday", items: ["Chicken Curry", "Veg Curry", "Sambar", "Curd"] },
  { day: "Thursday", items: ["Veg Curry", "Sambar", "Curd", "Special Snack or Fry"] },
  { day: "Friday", items: ["Egg Fried Rice", "Veg Curry", "Sambar", "Curd"] },
  { day: "Saturday", items: ["Chapati", "Veg Curry", "Sambar", "Curd"] },
];

const highlights = [
  "Chicken served twice a week",
  "Chapati served twice a week",
  "Egg items served weekly",
  "Fresh breakfast every day",
  "Daily veg curry",
  "Daily dal for lunch",
  "Daily curd",
  "Daily sambar for dinner",
  "Weekly sweets and snacks",
];

export default function FoodPage() {
  return (
    <PublicLayout>
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
            Mess & <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-500">Food</span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600 leading-relaxed">
            Enjoy nutritious, delicious, and homely food prepared daily in a hygienic environment. Our varied menu keeps you healthy and energized.
          </p>
        </div>

        {/* Food Highlights */}
        <div className="mb-16 animate-fade-in-up">
          <div className="relative overflow-hidden rounded-3xl border border-orange-100 bg-gradient-to-br from-orange-50 to-amber-50/50 p-8 shadow-lg shadow-orange-900/5 sm:p-10">
            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-orange-400/10 blur-3xl" />
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-8">
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500 to-amber-500 text-2xl text-white shadow-md shadow-orange-500/20">
                  ⭐
                </span>
                <h2 className="text-2xl font-bold text-orange-950">Menu Highlights</h2>
              </div>
              <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {highlights.map((highlight, index) => (
                  <li key={index} className="flex items-center gap-3 text-sm font-semibold text-orange-900 bg-white/60 p-3 rounded-xl border border-orange-100/50 shadow-sm backdrop-blur-sm transition-transform duration-300 hover:scale-[1.02]">
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-orange-100 text-orange-600">
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    {highlight}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Daily Lunch Card */}
        <div className="mb-16 animate-fade-in-up" style={{ animationDelay: "100ms" }}>
          <Card className="border-teal-100 shadow-xl shadow-teal-900/5 overflow-hidden rounded-[2rem]">
            <CardHeader className="bg-gradient-to-r from-teal-50 to-emerald-50 border-b border-teal-100 pb-6 pt-8">
              <div className="flex flex-col items-center justify-center gap-4">
                <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-teal-500 to-emerald-500 text-3xl text-white shadow-lg shadow-teal-500/20">
                  🍛
                </span>
                <h2 className="text-2xl font-bold tracking-tight text-teal-950">Everyday Lunch</h2>
              </div>
            </CardHeader>
            <CardContent className="pt-8 pb-10">
              <div className="flex flex-wrap justify-center gap-4">
                {["Rice", "One Veg Curry", "Pappu / Dal", "Curd", "Fry / Chips / Side Dish"].map((item, index) => (
                  <span key={index} className="inline-flex items-center rounded-full bg-white px-5 py-2.5 text-sm font-bold text-teal-800 border border-teal-200 shadow-sm transition-transform hover:-translate-y-1 hover:shadow-md hover:border-teal-300 duration-300">
                    {item}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Breakfast & Dinner Grids */}
        <div className="grid gap-10 lg:grid-cols-2 animate-fade-in-up" style={{ animationDelay: "200ms" }}>
          {/* Breakfast */}
          <section>
            <div className="mb-8 flex items-center gap-4">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-400 to-orange-400 text-2xl text-white shadow-md shadow-amber-500/20">
                🌅
              </span>
              <h2 className="text-2xl font-bold tracking-tight text-slate-900">Breakfast Schedule</h2>
            </div>
            <div className="space-y-4">
              {breakfastSchedule.map((dayInfo) => (
                <div key={dayInfo.day} className="group flex items-center justify-between rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-amber-200 hover:shadow-lg hover:shadow-amber-900/5">
                  <span className="font-bold text-slate-500 w-28 uppercase tracking-wider text-xs">{dayInfo.day}</span>
                  <div className="flex items-center gap-3">
                    <span className="text-base font-bold text-slate-900 group-hover:text-amber-600 transition-colors">{dayInfo.item}</span>
                    <span className="text-2xl transform group-hover:scale-110 transition-transform duration-300">{dayInfo.icon}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Dinner */}
          <section>
            <div className="mb-8 flex items-center gap-4">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-blue-500 text-2xl text-white shadow-md shadow-indigo-500/20">
                🌙
              </span>
              <h2 className="text-2xl font-bold tracking-tight text-slate-900">Dinner Schedule</h2>
            </div>
            <div className="space-y-4">
              {dinnerSchedule.map((dayInfo) => (
                <div key={dayInfo.day} className="group flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-indigo-200 hover:shadow-lg hover:shadow-indigo-900/5">
                  <span className="font-bold text-slate-500 w-28 shrink-0 uppercase tracking-wider text-xs">{dayInfo.day}</span>
                  <div className="flex flex-wrap gap-2 sm:justify-end">
                    {dayInfo.items.map((item, idx) => {
                      const isNonVeg = item.toLowerCase().includes("chicken") || item.toLowerCase().includes("egg");
                      return (
                        <span
                          key={idx}
                          className={`inline-flex items-center rounded-lg px-3 py-1.5 text-xs font-bold border transition-colors ${
                            isNonVeg
                              ? "bg-rose-50 text-rose-700 border-rose-100 group-hover:border-rose-200 group-hover:bg-rose-100"
                              : "bg-slate-50 text-slate-700 border-slate-100 group-hover:border-slate-200"
                          }`}
                        >
                          {item}
                        </span>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </PublicLayout>
  );
}
