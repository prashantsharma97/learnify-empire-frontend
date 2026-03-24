import React from "react";


const CourseCard = ({
    title,
    instructor,
    thumbnail,
    duration,
    students,
    price,
    rating,
    actions,
    onClick,
}) => {

    return (
        <>
            <article
                className="rounded-2xl border border-white/10 bg-white/5 p-4 transition hover:-translate-y-1 hover:bg-white/10 cursor-pointer bg-glass-dark backdrop-blur-sm"
                onClick={onClick}
            >
                <img
                    src={thumbnail}
                    alt={title}
                    className="w-full h-40 object-cover rounded-lg mb-3"
                />
                <h3 className="text-lg font-semibold mb-1">{title}</h3>
                <p className="text-sm text-muted-foreground mb-2">by {instructor}</p>
                <div className="text-xs text-muted-foreground mb-2">
                    <span>{duration}</span> · <span>{students} students</span> · <span>⭐ {rating}</span>
                </div>
                <div className="mb-3 text-neon-green font-bold">${price}</div>
                {actions ? actions : null}
            </article>
        </>
    );
};

export default CourseCard;