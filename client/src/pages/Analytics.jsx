import { useEffect, useState } from "react";
import {
    SearchCheck,
    Smile,
    CheckCircle2,
    AlertCircle,
    BarChart3
} from "lucide-react";

import api from "../services/api";

import {
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer,
    RadialBarChart,
    RadialBar,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip
} from "recharts";


function Analytics() {

    const [stats, setStats] = useState({
        total: 0,
        blogPosts: 0,
        socialPosts: 0,
        emails: 0,
        averageSEO: 0,
        averageToneConfidence: 0
    });

    const [loading, setLoading] = useState(true);


    useEffect(() => {
        fetchAnalytics();
    }, []);


    const fetchAnalytics = async () => {

        try {

            const response = await api.get(
                "/content/stats"
            );

            setStats(response.data);

        } catch (error) {

            console.log(error);

        } finally {

            setLoading(false);

        }

    };


    const seoData = [
        {
            name: "SEO",
            value: stats.averageSEO,
            fill: "#22c55e"
        }
    ];


    const contentData = [
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


    const barData = [
        {
            name: "Blog",
            value: stats.blogPosts
        },
        {
            name: "Social",
            value: stats.socialPosts
        },
        {
            name: "Email",
            value: stats.emails
        }
    ];


    if (loading) {

        return (

            <div className="rounded-2xl bg-white p-8 shadow">
                Loading analytics...
            </div>

        );

    }


    return (

        <div className="relative min-h-full overflow-hidden rounded-3xl bg-gradient-to-br from-blue-700 via-indigo-700 to-violet-700 p-6 lg:p-8">

            <div className="absolute -left-32 bottom-0 h-96 w-96 rounded-full bg-blue-500/50" />

            <div className="absolute -right-28 top-24 h-96 w-96 rounded-full bg-blue-500/40" />


            <div className="relative z-10">

                <div className="mb-8 text-white">

                    <h1 className="text-4xl font-bold">
                        SEO & Tone Analysis
                    </h1>

                    <p className="mt-2 text-blue-100">
                        Analyse your content performance, tone consistency and content distribution.
                    </p>

                </div>


                <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">


                    {/* Content Preview */}

                    <div className="rounded-3xl bg-white p-7 shadow-2xl">

                        <div className="flex items-center gap-3">

                            <div className="rounded-xl bg-blue-100 p-3 text-blue-600">
                                <BarChart3 size={24} />
                            </div>

                            <div>

                                <h2 className="text-2xl font-bold">
                                    Content Overview
                                </h2>

                                <p className="text-sm text-gray-500">
                                    A summary of your generated marketing content.
                                </p>

                            </div>

                        </div>


                        <div className="mt-7 grid grid-cols-2 gap-4">

                            <div className="rounded-2xl bg-blue-50 p-5">

                                <p className="text-sm text-gray-500">
                                    Total Content
                                </p>

                                <p className="mt-2 text-4xl font-bold text-blue-600">
                                    {stats.total}
                                </p>

                            </div>

                            <div className="rounded-2xl bg-green-50 p-5">

                                <p className="text-sm text-gray-500">
                                    Blog Posts
                                </p>

                                <p className="mt-2 text-4xl font-bold text-green-600">
                                    {stats.blogPosts}
                                </p>

                            </div>

                            <div className="rounded-2xl bg-purple-50 p-5">

                                <p className="text-sm text-gray-500">
                                    Social Posts
                                </p>

                                <p className="mt-2 text-4xl font-bold text-purple-600">
                                    {stats.socialPosts}
                                </p>

                            </div>

                            <div className="rounded-2xl bg-orange-50 p-5">

                                <p className="text-sm text-gray-500">
                                    Email Campaigns
                                </p>

                                <p className="mt-2 text-4xl font-bold text-orange-600">
                                    {stats.emails}
                                </p>

                            </div>

                        </div>


                        <div className="mt-8">

                            <h3 className="mb-4 text-lg font-bold">
                                Content Performance
                            </h3>

                            <ResponsiveContainer width="100%" height={260}>

                                <BarChart data={barData}>

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

                                    <Tooltip />

                                    <Bar
                                        dataKey="value"
                                        fill="#2563eb"
                                        radius={[10, 10, 0, 0]}
                                    />

                                </BarChart>

                            </ResponsiveContainer>

                        </div>

                    </div>


                    <div className="space-y-6">


                        {/* SEO Score */}

                        <div className="rounded-3xl bg-white p-7 shadow-2xl">

                            <div className="flex items-center gap-3">

                                <div className="rounded-xl bg-green-100 p-3 text-green-600">
                                    <SearchCheck size={24} />
                                </div>

                                <h2 className="text-2xl font-bold">
                                    SEO Score
                                </h2>

                            </div>


                            <div className="mt-5 grid grid-cols-1 items-center gap-6 md:grid-cols-2">

                                <div className="relative">

                                    <ResponsiveContainer width="100%" height={210}>

                                        <RadialBarChart
                                            innerRadius="70%"
                                            outerRadius="100%"
                                            data={seoData}
                                            startAngle={90}
                                            endAngle={-270}
                                        >

                                            <RadialBar
                                                dataKey="value"
                                                background
                                                cornerRadius={20}
                                            />

                                        </RadialBarChart>

                                    </ResponsiveContainer>


                                    <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">

                                        <p className="text-4xl font-bold">
                                            {stats.averageSEO}
                                        </p>

                                        <p className="text-sm text-gray-500">
                                            / 100
                                        </p>

                                    </div>

                                </div>


                                <div className="space-y-4">

                                    <div className="flex items-center justify-between">

                                        <span className="flex items-center gap-2">
                                            <span className="h-3 w-3 rounded-full bg-green-500" />
                                            Content Quality
                                        </span>

                                        <strong>
                                            {stats.averageSEO}/100
                                        </strong>

                                    </div>

                                    <div className="flex items-center justify-between">

                                        <span className="flex items-center gap-2">
                                            <span className="h-3 w-3 rounded-full bg-green-500" />
                                            Keyword Usage
                                        </span>

                                        <strong>
                                            {Math.max(stats.averageSEO - 7, 0)}/100
                                        </strong>

                                    </div>

                                    <div className="flex items-center justify-between">

                                        <span className="flex items-center gap-2">
                                            <span className="h-3 w-3 rounded-full bg-green-500" />
                                            Readability
                                        </span>

                                        <strong>
                                            {Math.max(stats.averageSEO - 3, 0)}/100
                                        </strong>

                                    </div>

                                </div>

                            </div>

                        </div>


                        {/* Tone Analysis */}

                        <div className="rounded-3xl bg-white p-7 shadow-2xl">

                            <div className="flex items-center gap-3">

                                <div className="rounded-xl bg-green-100 p-3 text-green-600">
                                    <Smile size={26} />
                                </div>

                                <div>

                                    <h2 className="text-2xl font-bold">
                                        Tone Analysis
                                    </h2>

                                    <p className="text-sm text-gray-500">
                                        Your content maintains a friendly and consistent voice.
                                    </p>

                                </div>

                            </div>


                            <div className="mt-7">

                                <div className="flex items-center justify-between">

                                    <p className="font-semibold">
                                        Consistency Score
                                    </p>

                                    <strong>
                                        {stats.averageToneConfidence}%
                                    </strong>

                                </div>

                                <div className="mt-3 h-3 overflow-hidden rounded-full bg-gray-200">

                                    <div
                                        className="h-full rounded-full bg-green-500 transition-all duration-700"
                                        style={{
                                            width: `${stats.averageToneConfidence}%`
                                        }}
                                    />

                                </div>

                            </div>

                        </div>


                        {/* Distribution */}

                        <div className="rounded-3xl bg-white p-7 shadow-2xl">

                            <h2 className="text-2xl font-bold">
                                Content Distribution
                            </h2>

                            <div className="grid grid-cols-1 items-center md:grid-cols-2">

                                <ResponsiveContainer width="100%" height={220}>

                                    <PieChart>

                                        <Pie
                                            data={contentData}
                                            dataKey="value"
                                            nameKey="name"
                                            innerRadius={55}
                                            outerRadius={85}
                                            paddingAngle={4}
                                        >

                                            {
                                                contentData.map((item) => (

                                                    <Cell
                                                        key={item.name}
                                                        fill={item.fill}
                                                    />

                                                ))
                                            }

                                        </Pie>

                                        <Tooltip />

                                    </PieChart>

                                </ResponsiveContainer>


                                <div className="space-y-3">

                                    {
                                        contentData.map((item) => (

                                            <div
                                                key={item.name}
                                                className="flex items-center justify-between"
                                            >

                                                <span className="flex items-center gap-2">

                                                    <span
                                                        className="h-3 w-3 rounded-full"
                                                        style={{
                                                            backgroundColor: item.fill
                                                        }}
                                                    />

                                                    {item.name}

                                                </span>

                                                <strong>
                                                    {item.value}
                                                </strong>

                                            </div>

                                        ))
                                    }

                                </div>

                            </div>

                        </div>

                    </div>


                    {/* Recommendations */}

                    <div className="rounded-3xl bg-pink-100 p-7 shadow-xl xl:col-span-2">

                        <h2 className="text-center text-2xl font-bold">
                            SEO Recommendations
                        </h2>


                        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">

                            <div className="flex gap-3 rounded-2xl bg-white/70 p-4">

                                <CheckCircle2 className="shrink-0 text-green-600" />

                                <p className="font-medium">
                                    Include your target keyword in the meta description.
                                </p>

                            </div>

                            <div className="flex gap-3 rounded-2xl bg-white/70 p-4">

                                <AlertCircle className="shrink-0 text-orange-500" />

                                <p className="font-medium">
                                    Add more internal links to improve SEO.
                                </p>

                            </div>

                            <div className="flex gap-3 rounded-2xl bg-white/70 p-4">

                                <CheckCircle2 className="shrink-0 text-green-600" />

                                <p className="font-medium">
                                    Your overall content length is good.
                                </p>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

}


export default Analytics;