import React from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Button from "../../../components/ui/Button";
import { getCourseById, enrollCourse } from "../../../apiComponents/apiService.jsx";
import { UserContext } from "../../../components/context/UserContext.js";

const CourseDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = React.useContext(UserContext);
    const [enrolled, setEnrolled] = useState(false);
    const [course, setCourse] = React.useState<any[]>([]);
    const [justEnrolled, setJustEnrolled] = useState(false);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
            const getUserId = localStorage.getItem("user",user);

        if (user?.id) {
            fetchCourseDetails();
        }
        console.log("refresh", getUserId?.id);
    }, [id, user?.id]);


    const fetchCourseDetails = async () => {
        try {
            const response = await getCourseById(id, getUserId.id );
            setCourse(response.data.course);
            console.log("Course Details:", response.data.course);
            console.log("Course Details:--", response.data.course.title);
            setEnrolled(response.data.course.isEnrolled);
        } catch (error) {
            console.error("Error fetching course details:", error);
        } finally {
            setLoading(false);
        }
    };

    const getTotalDuration = (lessons) => {
        if (!lessons || lessons.length === 0) return "N/A";
        const totalMinutes = lessons.reduce((sum, lesson) => {
            const duration = lesson.duration;
            if (typeof duration === 'string') {
                const match = duration.match(/(\d+)/);
                return sum + (match ? parseInt(match[0]) : 0);
            }
            return sum + (typeof duration === 'number' ? duration : 0);
        }, 0);
        return `${totalMinutes} mins`;
    };

    const handleEnroll = async () => {
        const studentId = user?.id;
        try {
            const response = await enrollCourse({ courseId: id, studentId });
            setEnrolled(true);
            setJustEnrolled(true);
            if (response.data && response.data.message) {
                setTimeout(() => {
                    setJustEnrolled(false);
                    navigate('/dashboard/student/browse-courses');
                }, 2000);
            }
        } catch (error) {
            console.error("Error enrolling in course:", error);
            setEnrolled(false); // Revert enrollment state on error
        } finally {
            setLoading(false);
        }
    };

    // if (!course) {
    //     return <p className="text-white">Loading...</p>;
    // }

    return (
        <div className="space-y-8 p-4 md:p-8 translate-x-0 fixed md:relative md:translate-x-0 z-40 transition-transform duration-300 ease-in-out">
            <div className="rounded-2xl border border-white/10 bg-gradient-to-r from-neon-purple/30 via-neon-cyan/20 to-neon-magenta/20 p-6 bg-glass-dark backdrop-blur-sm p-4 border-r border-neon-blue/20">
                <h1 className="text-3xl md:text-4xl font-bold gradient-text">{course?.title}</h1>
                <p className="mt-2 text-muted-foreground">by {course?.instructorId?.username || "Loading..."}</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-6">
                    <img
                        src={course?.thumbnail}
                        alt={course?.title}
                        className="w-full h-64 object-cover rounded-xl"
                    />
                    <div className="space-y-4">
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span>⭐ {course?.rating}</span>
                            <span>{course?.students} students</span>
                            <span>{course?.duration}</span>
                        </div>
                        <p className="text-lg">{course?.description}</p>
                        <div className="space-y-2">
                            <h3 className="text-xl font-semibold">Syllabus</h3>
                            <ul className="list-disc list-inside space-y-1">
                                {course?.lessons && course.lessons.length > 0 && (
                                    course.lessons.map((lesson, index) => (
                                        <li key={index}>{lesson.title} - {lesson.duration}</li>
                                    ))
                                )}
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="rounded-xl border border-white/10 bg-white/5 p-6 bg-glass-dark backdrop-blur-sm p-4 border-r border-neon-blue/20">
                        <div className="text-center">
                            <div className="text-4xl font-bold text-neon-green mb-2">${course?.pricingInfo?.coursePrice || 0}</div>
                            <p className="text-sm text-muted-foreground mb-4">One-time payment</p>
                            {loading ? (
                                <p className="text-white text-center">Loading...</p>

                            ) : !enrolled ? (
                                <Button
                                    onClick={handleEnroll}
                                    className="w-full rounded-lg bg-gradient-to-r from-neon-purple to-neon-cyan text-white py-3"
                                >
                                    🛒 Enroll Now
                                </Button>

                            ) : justEnrolled ? (
                                <div className="text-center">
                                    <div className="text-2xl mb-2">✅</div>
                                    <p className="text-lg font-semibold text-neon-green">
                                        Enrolled Successfully!
                                    </p>
                                </div>

                            ) : (
                                <Button
                                    onClick={() => navigate(`/dashboard/student/course/${id}/learn`)}
                                    className="w-full bg-green-500"
                                >
                                    ▶ Continue Learning
                                </Button>
                            )}
                        </div>
                    </div>

                    <div className="rounded-xl border border-white/10 bg-white/5 p-6 bg-glass-dark backdrop-blur-sm p-4 border-r border-neon-blue/20">
                        <h3 className="text-lg font-semibold mb-4">Course Details</h3>
                        <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                                <span>Level:</span>
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${course?.difficultyLevel === "Beginner" ? "bg-neon-green/10 text-neon-green" :
                                    course?.difficultyLevel === "Intermediate" ? "bg-neon-cyan/10 text-neon-cyan" :
                                        "bg-neon-magenta/10 text-neon-magenta"
                                    }`}>{course?.difficultyLevel}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Category:</span>
                                <span>{course?.category}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Duration:</span>
                                <span>{getTotalDuration(course?.lessons)}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="text-center">
                <Button
                    onClick={() => navigate(-1)}
                    className="rounded-lg border border-white/20 bg-white/10"
                >
                    ← Back to Browse
                </Button>
            </div>
        </div>
    );
};

export default CourseDetail;