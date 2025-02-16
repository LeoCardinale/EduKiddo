import { useState } from 'react'
import axios from 'axios'

interface JourneySetupProps {
    onJourneyCreated: (journey: any) => void
}

export default function JourneySetup({ onJourneyCreated }: JourneySetupProps) {
    const [formData, setFormData] = useState({
        subject: '',
        topic: '',
        age_group: ''
    })
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        try {
            console.log('Sending request with data:', formData)
            const response = await axios.post('http://localhost:8000/api/journeys/generate/', formData)
            console.log('Response received:', response.data)
            onJourneyCreated(response.data)
        } catch (err) {
            console.error('Detailed error:', err)
            const error = err as any
            alert(`Error: ${error?.response?.data?.error || error?.message || 'Unknown error occurred'}`)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6">Create Your Learning Journey</h2>

            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block mb-2">Subject:</label>
                    <input
                        type="text"
                        value={formData.subject}
                        onChange={(e) => setFormData(prev => ({ ...prev, subject: e.target.value }))}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block mb-2">Topic:</label>
                    <input
                        type="text"
                        value={formData.topic}
                        onChange={(e) => setFormData(prev => ({ ...prev, topic: e.target.value }))}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>

                <div className="mb-6">
                    <label className="block mb-2">Age Group:</label>
                    <select
                        value={formData.age_group}
                        onChange={(e) => setFormData(prev => ({ ...prev, age_group: e.target.value }))}
                        className="w-full p-2 border rounded"
                        required
                    >
                        <option value="">Select age group...</option>
                        <option value="3-4">3-4 years</option>
                        <option value="8-9">8-9 years</option>
                    </select>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
                >
                    {loading ? 'Generating...' : 'Create Journey'}
                </button>
            </form>
        </div>
    )
}