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
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">
            Mess & Food
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-slate-600">
            Enjoy nutritious, delicious, and homely food prepared daily in a hygienic environment.
          </p>
        </div>

        {/* Food Highlights */}
        <div className="mb-12">
          <div className="rounded-2xl border border-orange-100 bg-orange-50 p-6 shadow-sm sm:p-8">
            <div className="flex items-center gap-3 mb-6">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-600 text-xl text-white shadow-sm">
                ⭐
              </span>
              <h2 className="text-xl font-bold text-orange-900">Food Highlights</h2>
            </div>
            <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {highlights.map((highlight, index) => (
                <li key={index} className="flex items-center gap-2 text-sm font-medium text-orange-800">
                  <svg className="h-5 w-5 text-orange-500 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  {highlight}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Daily Lunch Card */}
        <div className="mb-12">
          <Card className="border-teal-100 shadow-sm overflow-hidden">
            <CardHeader className="bg-teal-50 border-b border-teal-100 pb-4">
              <div className="flex items-center justify-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-600 text-xl text-white shadow-sm">
                  🍛
                </span>
                <h2 className="text-xl font-bold text-teal-900">Everyday Lunch</h2>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="flex flex-wrap justify-center gap-3">
                {["Rice", "One Veg Curry", "Pappu / Dal", "Curd", "Fry / Chips / Side Dish"].map((item, index) => (
                  <span key={index} className="inline-flex items-center rounded-full bg-teal-50 px-4 py-2 text-sm font-semibold text-teal-700 border border-teal-100 shadow-sm">
                    {item}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Breakfast & Dinner Grids */}
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Breakfast */}
          <section>
            <div className="mb-6 flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500 text-xl text-white shadow-sm">
                🌅
              </span>
              <h2 className="text-2xl font-bold text-slate-900">Breakfast Schedule</h2>
            </div>
            <div className="space-y-3">
              {breakfastSchedule.map((dayInfo) => (
                <div key={dayInfo.day} className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-all hover:border-amber-300 hover:shadow-md">
                  <span className="font-semibold text-slate-700 w-28">{dayInfo.day}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-slate-900">{dayInfo.item}</span>
                    <span className="text-xl">{dayInfo.icon}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Dinner */}
          <section>
            <div className="mb-6 flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-xl text-white shadow-sm">
                🌙
              </span>
              <h2 className="text-2xl font-bold text-slate-900">Dinner Schedule</h2>
            </div>
            <div className="space-y-3">
              {dinnerSchedule.map((dayInfo) => (
                <div key={dayInfo.day} className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-all hover:border-indigo-300 hover:shadow-md">
                  <span className="font-semibold text-slate-700 w-28 shrink-0">{dayInfo.day}</span>
                  <div className="flex flex-wrap gap-1.5 sm:justify-end">
                    {dayInfo.items.map((item, idx) => {
                      const isNonVeg = item.toLowerCase().includes("chicken") || item.toLowerCase().includes("egg");
                      return (
                        <span
                          key={idx}
                          className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium border ${
                            isNonVeg
                              ? "bg-red-50 text-red-700 border-red-100"
                              : "bg-slate-50 text-slate-700 border-slate-200"
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
