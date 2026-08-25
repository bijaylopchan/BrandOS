import { useEffect, useState } from "react";
import api from "../services/api";

function History() {
    const [history, setHistory] = useState([]);
    const [seoResults, setSeoResults] = useState({});
    const [toneResults, setToneResults] = useState({});
    const [editingId, setEditingId] = useState(null);
    const [editText, setEditText] = useState("");
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [filterType, setFilterType] = useState("all");

    useEffect(() => {
        fetchHistory();
    }, []);

    const fetchHistory = async () => {
        try {
            const response = await api.get("/content/history");
            setHistory(response.data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const startEdit = (item) => {
        setEditingId(item.id);
        setEditText(item.body);
    };

    const saveEdit = async (id) => {
        try {
            await api.put(`/content/${id}`, {
                body: editText,
            });

            setEditingId(null);
            fetchHistory();
        } catch (error) {
            console.log(error);
        }
    };

    const deleteContent = async (id) => {
        try {
            await api.delete(`/content/${id}`);
            fetchHistory();
        } catch (error) {
            console.log(error);
        }
    };

    const analyzeSEO = async (id) => {
        try {
            const response = await api.post(`/content/${id}/seo`);

            setSeoResults({
                ...seoResults,
                [id]: response.data,
            });
        } catch (error) {
            console.log(error);
        }
    };

    const analyzeTone = async (id) => {
        try {
            const response = await api.post(`/content/${id}/tone`);

            setToneResults({
                ...toneResults,
                [id]: response.data,
            });
        } catch (error) {
            console.log(error);
        }
    };

    const filteredHistory = history.filter((item) => {
        const search = searchTerm.toLowerCase();

        const matchesSearch =
            item.title?.toLowerCase().includes(search) ||
            item.body?.toLowerCase().includes(search) ||
            item.type?.toLowerCase().includes(search);

        const matchesType =
            filterType === "all" ||
            item.type?.toLowerCase().includes(filterType.toLowerCase());

        return matchesSearch && matchesType;
    });

    return (
        <div>
            <h1 className="text-4xl font-bold mb-6">
                Content History
            </h1>

            <div className="flex flex-col md:flex-row gap-3 mb-6">
                <input
                    type="text"
                    placeholder="Search your content..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="flex-1 border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <select
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                    className="border border-gray-300 rounded-lg px-4 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="all">All Content</option>
                    <option value="blog">Blog</option>
                    <option value="email">Email</option>
                    <option value="social">Social Media</option>
                </select>
            </div>

            {loading ? (
                <p className="text-gray-600">
                    Loading content history...
                </p>
            ) : history.length === 0 ? (
                <p>
                    Your previous AI generated content will appear here.
                </p>
            ) : filteredHistory.length === 0 ? (
                <p className="text-gray-500">
                    No content found matching your search or filter.
                </p>
            ) : (
                filteredHistory.map((item) => (
                    <div
                        key={item.id}
                        className="bg-white shadow rounded-lg p-6 mb-4"
                    >
                        <h2 className="text-xl font-bold">
                            {item.title}
                        </h2>

                        <p className="text-gray-500 mb-3">
                            {item.type}
                        </p>

                        {editingId === item.id ? (
                            <textarea
                                value={editText}
                                onChange={(e) =>
                                    setEditText(e.target.value)
                                }
                                className="w-full border p-3 rounded-lg"
                                rows="6"
                            />
                        ) : (
                            <div>
                                <p>
                                    {item.body}
                                </p>

                                {seoResults[item.id] && (
                                    <div className="mt-4 bg-gray-100 p-4 rounded-lg">
                                        <h3 className="font-bold">
                                            SEO Analysis
                                        </h3>

                                        <p>
                                            Score:{" "}
                                            {seoResults[item.id].score}/100
                                        </p>

                                        <p>
                                            Keywords:{" "}
                                            {seoResults[item.id].keywords}
                                        </p>

                                        <p>
                                            Suggestions:{" "}
                                            {seoResults[item.id].suggestions}
                                        </p>
                                    </div>
                                )}

                                {toneResults[item.id] && (
                                    <div className="mt-4 bg-yellow-100 p-4 rounded-lg">
                                        <h3 className="font-bold">
                                            Tone Analysis
                                        </h3>

                                        <p>
                                            Tone:{" "}
                                            {toneResults[item.id].tone}
                                        </p>

                                        <p>
                                            Confidence:{" "}
                                            {toneResults[item.id].confidence}%
                                        </p>
                                    </div>
                                )}
                            </div>
                        )}

                        {editingId === item.id ? (
                            <button
                                onClick={() => saveEdit(item.id)}
                                className="mt-4 bg-green-600 text-white px-5 py-2 rounded-lg"
                            >
                                Save Changes
                            </button>
                        ) : (
                            <div className="flex flex-wrap gap-3 mt-4">
                                <button
                                    onClick={() => startEdit(item)}
                                    className="bg-blue-600 text-white px-5 py-2 rounded-lg"
                                >
                                    Edit
                                </button>

                                <button
                                    onClick={() => deleteContent(item.id)}
                                    className="bg-red-600 text-white px-5 py-2 rounded-lg"
                                >
                                    Delete
                                </button>

                                <button
                                    onClick={() => analyzeSEO(item.id)}
                                    className="bg-purple-600 text-white px-5 py-2 rounded-lg"
                                >
                                    Analyze SEO
                                </button>

                                <button
                                    onClick={() => analyzeTone(item.id)}
                                    className="bg-orange-600 text-white px-5 py-2 rounded-lg"
                                >
                                    Analyze Tone
                                </button>
                            </div>
                        )}
                    </div>
                ))
            )}
        </div>
    );
}

export default History;