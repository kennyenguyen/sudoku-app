import DifficultyControl from "./DifficultyControl";

export default function Difficulty({ onGenerate, onInitialize, onUpdateSolution, onUpdateStarting }) {

    const difficulty = {
        easy: 40,
        medium: 36,
        hard: 32
    };

    return (
        <div className="center-div">
            <DifficultyControl 
                level={ difficulty.easy } 
                onGenerate={ onGenerate } 
                onInitialize={ onInitialize } 
                onUpdateSolution={ onUpdateSolution } 
                onUpdateStarting={ onUpdateStarting } 
            />
            <DifficultyControl 
                level={ difficulty.medium } 
                onGenerate={ onGenerate } 
                onInitialize={ onInitialize } 
                onUpdateSolution={ onUpdateSolution } 
                onUpdateStarting={ onUpdateStarting } 
            />
            <DifficultyControl 
                level={ difficulty.hard } 
                onGenerate={ onGenerate } 
                onInitialize={ onInitialize } 
                onUpdateSolution={ onUpdateSolution } 
                onUpdateStarting={ onUpdateStarting } 
            />
        </div>
    );
    
}
