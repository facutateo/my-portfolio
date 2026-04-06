

function SkillCard({ skill}: { skill: string; }) {
    return (
        <div className="rounded-lg p-4 w-40 h-50 flex flex-col justify-center items-center hover:animate-bouncing cursor-pointer" id="skillcard">
            <h2 className="text-xl font-bold mb-2">{skill}</h2>
            <img src={`logos/${skill}.svg`} alt={`logo ${skill}`} className="h-20 w-20" />
        </div>
    );
}

export default SkillCard;
