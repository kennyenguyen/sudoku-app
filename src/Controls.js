import DifficultyControl from "./DifficultyControl";

export default function Controls({ onGenerate }) {

    const difficulty = {
        easy: 38,
        medium: 30,
        hard: 26
    }

    return (
        <div className="center-div">
            <DifficultyControl onGenerate={ onGenerate } level={ difficulty.easy } />
            <DifficultyControl onGenerate={ onGenerate } level={ difficulty.medium } />
            <DifficultyControl onGenerate={ onGenerate } level={ difficulty.hard } />
        </div>
    );
}
