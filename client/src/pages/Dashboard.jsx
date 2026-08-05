import { useEffect, useState } from "react";
import api from "../services/api";

import {
    FileText,
    PencilLine,
    Share2,
    Mail,
    BarChart3,
    Clock3
} from "lucide-react";

import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell
} from "recharts";


function Dashboard() {

    const [stats, setStats] = useState({
        total: 0,
        blogPosts: 0,
        socialPosts: 0,
        emails: 0
    });

    const [recentContent, setRecentContent] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        loadDashboard();
    }, []);


    const loadDashboard = async () => {

        try {

            await Promise.all([
                fetchStats(),
                fetchRecentContent()
            ]);

        } catch (error) {

            console.log(error);

        } finally {

            setLoading(false);

        }

    };


    const fetchStats = async () => {

        try {

            const response = await api.get("/content/stats");

            setStats(response.data);

        } catch (error) {

            console.log(error);

        }

    };


    const fetchRecentContent = async () => {

        try {

            const response = await api.get("/content/history");

            setRecentContent(response.data.slice(0, 3));

        } catch (error) {

            console.log(error);

        }

    };


    const chartData = [
        {
            name: "Blog Posts",
            value: stats.blogPosts,
            fill: "#2563eb"
        },
        {
            name: "Social Posts",
            value: stats.socialPosts,
            fill: "#22c55e"
        },
        {
            name: "Emails",
            value: stats.emails,
            fill: "#f97316"
        }
    ];


    const totalForPercentage =
        stats.blogPosts +
        stats.socialPosts +
        stats.emails;


    const getPercentage = (value) => {

        if (!totalForPercentage) {
            return 0;
        }

        return Math.round(
            (value / totalForPercentage) * 100
        );

    };


    if (loading) {

        return (

            <div className="rounded-2xl bg-white p-8 shadow-sm">

                <p className="text-gray-600">
                    Loading dashboard...
                </p>

            </div>

        );

    }


    return (

        <div className="space-y-8">

            {/* Hero */}

            <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-50 via-white to-purple-50 p-8">

                <div className="relative z-10">

                    <h1 className="text-4xl font-bold text-gray-900">
                        Welcome back, Bijay! 👋
                    </h1>

                    <p className="mt-2 text-gray-600">
                        Manage your AI-generated marketing content from one place.
                    </p>

                </div>

                <div className="absolute -right-12 -top-16 h-56 w-56 rounded-full bg-blue-200 opacity-40 blur-3xl" />

                <div className="absolute right-24 top-4 h-36 w-36 rounded-full bg-purple-200 opacity-40 blur-2xl" />

            </section>


            {/* Stat Cards */}

            <section className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">

                <div className="rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50 to-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">

                    <div className="flex items-center justify-between">

                        <div className="rounded-xl bg-blue-100 p-3 text-blue-600">
                            <FileText size={22} />
                        </div>

                        <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700">
                            All content
                        </span>

                    </div>

                    <p className="mt-5 text-sm font-medium text-gray-500">
                        Total Content
                    </p>

                    <p className="mt-1 text-4xl font-bold text-blue-600">
                        {stats.total}
                    </p>

                </div>


                <div className="rounded-2xl border border-green-100 bg-gradient-to-br from-green-50 to-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">

                    <div className="flex items-center justify-between">

                        <div className="rounded-xl bg-green-100 p-3 text-green-600">
                            <PencilLine size={22} />
                        </div>

                        <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                            Published
                        </span>

                    </div>

                    <p className="mt-5 text-sm font-medium text-gray-500">
                        Blog Posts
                    </p>

                    <p className="mt-1 text-4xl font-bold text-green-600">
                        {stats.blogPosts}
                    </p>

                </div>


                <div className="rounded-2xl border border-purple-100 bg-gradient-to-br from-purple-50 to-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">

                    <div className="flex items-center justify-between">

                        <div className="rounded-xl bg-purple-100 p-3 text-purple-600">
                            <Share2 size={22} />
                        </div>

                        <span className="rounded-full bg-purple-100 px-3 py-1 text-xs font-medium text-purple-700">
                            Social
                        </span>

                    </div>

                    <p className="mt-5 text-sm font-medium text-gray-500">
                        Social Posts
                    </p>

                    <p className="mt-1 text-4xl font-bold text-purple-600">
                        {stats.socialPosts}
                    </p>

                </div>


                <div className="rounded-2xl border border-orange-100 bg-gradient-to-br from-orange-50 to-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">

                    <div className="flex items-center justify-between">

                        <div className="rounded-xl bg-orange-100 p-3 text-orange-600">
                            <Mail size={22} />
                        </div>

                        <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-medium text-orange-700">
                            Campaigns
                        </span>

                    </div>

                    <p className="mt-5 text-sm font-medium text-gray-500">
                        Emails
                    </p>

                    <p className="mt-1 text-4xl font-bold text-orange-600">
                        {stats.emails}
                    </p>

                </div>

            </section>


            {/* Analytics */}

            <section className="grid grid-cols-1 gap-6 xl:grid-cols-3">

                <div className="rounded-2xl bg-white p-6 shadow-sm xl:col-span-2">

                    <div className="mb-6 flex items-center gap-3">

                        <div className="rounded-xl bg-blue-100 p-3 text-blue-600">
                            <BarChart3 size={22} />
                        </div>

                        <div>

                            <h2 className="text-2xl font-bold">
                                Content Analytics
                            </h2>

                            <p className="text-sm text-gray-500">
                                Overview of your content performance
                            </p>

                        </div>

                    </div>

                    <ResponsiveContainer width="100%" height={320}>

                        <BarChart data={chartData}>

                            <XAxis
                                dataKey="name"
                                axisLine={false}
                                tickLine={false}
                            />

                            <YAxis
                                allowDecimals={false}
                                axisLine={false}
                                tickLine={false}
                            />

                            <Tooltip
                                cursor={{ fill: "#f8fafc" }}
                            />

                            <Bar
                                dataKey="value"
                                radius={[10, 10, 0, 0]}
                            />

                        </BarChart>

                    </ResponsiveContainer>

                </div>


                <div className="rounded-2xl bg-white p-6 shadow-sm">

                    <h2 className="text-2xl font-bold">
                        Content Breakdown
                    </h2>

                    <p className="mt-1 text-sm text-gray-500">
                        Distribution by content type
                    </p>

                    <ResponsiveContainer width="100%" height={220}>

                        <PieChart>

                            <Pie
                                data={chartData}
                                dataKey="value"
                                nameKey="name"
                                innerRadius={55}
                                outerRadius={85}
                                paddingAngle={4}
                            >

                                {
                                    chartData.map((entry) => (

                                        <Cell
                                            key={entry.name}
                                            fill={entry.fill}
                                        />

                                    ))
                                }

                            </Pie>

                            <Tooltip />

                        </PieChart>

                    </ResponsiveContainer>


                    <div className="space-y-3">

                        <div className="flex items-center justify-between text-sm">

                            <span className="flex items-center gap-2">

                                <span className="h-3 w-3 rounded-full bg-blue-600" />

                                Blog Posts

                            </span>

                            <span className="font-semibold">
                                {getPercentage(stats.blogPosts)}% ({stats.blogPosts})
                            </span>

                        </div>


                        <div className="flex items-center justify-between text-sm">

                            <span className="flex items-center gap-2">

                                <span className="h-3 w-3 rounded-full bg-green-500" />

                                Social Posts

                            </span>

                            <span className="font-semibold">
                                {getPercentage(stats.socialPosts)}% ({stats.socialPosts})
                            </span>

                        </div>


                        <div className="flex items-center justify-between text-sm">

                            <span className="flex items-center gap-2">

                                <span className="h-3 w-3 rounded-full bg-orange-500" />

                                Emails

                            </span>

                            <span className="font-semibold">
                                {getPercentage(stats.emails)}% ({stats.emails})
                            </span>

                        </div>

                    </div>

                </div>

            </section>


            {/* Recent Content */}

            <section className="rounded-2xl bg-white p-6 shadow-sm">

                <div className="mb-6 flex items-center gap-3">

                    <div className="rounded-xl bg-blue-100 p-3 text-blue-600">
                        <Clock3 size={22} />
                    </div>

                    <div>

                        <h2 className="text-2xl font-bold">
                            Recent Generated Content
                        </h2>

                        <p className="text-sm text-gray-500">
                            Latest content you created
                        </p>

                    </div>

                </div>


                {
                    recentContent.length === 0 ? (

                        <p className="text-gray-500">
                            No generated content yet.
                        </p>

                    ) : (

                        <div className="space-y-4">

                            {
                                recentContent.map((item) => (

                                    <div
                                        key={item.id}
                                        className="rounded-xl border border-gray-100 bg-gray-50 p-5 transition hover:border-blue-200 hover:bg-blue-50"
                                    >

                                        <div className="flex flex-col justify-between gap-3 md:flex-row md:items-center">

                                            <div>

                                                <p className="font-semibold text-gray-900">
                                                    {item.title}
                                                </p>

                                                <p className="mt-1 text-sm text-gray-500">
                                                    {item.type}
                                                </p>

                                            </div>

                                            <span className="w-fit rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                                                Completed
                                            </span>

                                        </div>

                                        <p className="mt-4 line-clamp-2 text-gray-600">
                                            {item.body || "No content available"}
                                        </p>

                                    </div>

                                ))
                            }

                        </div>

                    )
                }

            </section>

        </div>

    );

}


export default Dashboard;