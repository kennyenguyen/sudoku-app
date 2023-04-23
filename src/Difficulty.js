import DifficultyControl from "./DifficultyControl";

export default function Difficulty({ onGenerate, onInitialize }) {

    const difficulty = {
        easy: 40,
        medium: 35,
        hard: 30
    };

    return (
        <div className="center-div">
            <DifficultyControl onGenerate={ onGenerate } onInitialize={ onInitialize } level={ difficulty.easy } />
            <DifficultyControl onGenerate={ onGenerate } onInitialize={ onInitialize } level={ difficulty.medium } />
            <DifficultyControl onGenerate={ onGenerate } onInitialize={ onInitialize } level={ difficulty.hard } />
        </div>
    );
    
}
