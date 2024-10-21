
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'
function App() {
    const [ruleId, setRuleId] = useState('');
    const [ruleString, setRuleString] = useState('');
    const [evaluationData, setEvaluationData] = useState({ age: '', department: '', salary: '', experience: '' });
    const [result, setResult] = useState(null);
    const [combinedResult, setCombinedResult] = useState(null);
    const [rules, setRules] = useState([]);
    const [selectedRules, setSelectedRules] = useState([]);


    const fetchRules = async () => {
        try {
            const response = await axios.get('http://localhost:5000/rule');
            setRules(response.data.rules);
        } catch (error) {
            console.error('Error fetching rules', error);
        }
    };

    useEffect(() => {
        fetchRules();
    }, []);

    const createRule = async () => {
        if (!ruleId || !ruleString) {
            alert('Please provide both Rule ID and Rule String.');
            return;
        }
        try {
            const response = await axios.post('http://localhost:5000/create-rule', { ruleId, ruleString });
            console.log(response.data);
            fetchRules();
            alert('Rule created successfully!');
        } catch (error) {
            console.error('Error creating rule', error);
        }
    };


    const evaluateRule = async () => {
        try {
            if (selectedRules.length === 0) {
                alert('Please select at least one rule to evaluate.');
                return;
            }
    
            let astToEvaluate;
    
           
            if (selectedRules.length > 1) {
                const response = await axios.post('http://localhost:5000/combine-rules', { ruleIds: selectedRules });
                astToEvaluate = response.data.combinedAST;
            } else {
             
                const response = await axios.get(`http://localhost:5000/rule/${selectedRules[0]}`);
                astToEvaluate = response.data.ast; 
            }
    
          
            const evaluationResponse = await axios.post('http://localhost:5000/evaluate-rule', { ast: astToEvaluate, data: evaluationData });
            setResult(evaluationResponse.data.result); 
        } catch (error) {
            console.error('Error evaluating rule', error);
        }
    };
    
    const combineRules = async () => {
        if (selectedRules.length === 0) {
            alert('Please select at least one rule to combine.');
            return;
        }

        try {
            const response = await axios.post('http://localhost:5000/combine-rules', { ruleIds: selectedRules });
            setCombinedResult(response.data.combinedAST);
            alert('Rules combined successfully!');
        } catch (error) {
            console.error('Error combining rules', error);
        }
    };

    const handleCheckboxChange = (ruleId) => {
        setSelectedRules((prevSelectedRules) => {
            if (prevSelectedRules.includes(ruleId)) {
                return prevSelectedRules.filter((id) => id !== ruleId);
            } else {
                return [...prevSelectedRules, ruleId];
            }
        });
    };

    return (
        <div className="AppContainer">
    <h1 className="heading">Rule Engine</h1>

    <div className='createRule'>
        <h2 className='subhead'>Create Rule</h2>
        <div className='inside'>
            <input 
                className='custom-input-one'
                type="text" 
                placeholder="Rule ID" 
                value={ruleId} 
                onChange={(e) => setRuleId(e.target.value)} 
            />
            <textarea 
                className='custom-input'
                placeholder="Rule String" 
                value={ruleString} 
                onChange={(e) => setRuleString(e.target.value)} 
            />
            <button className='button' onClick={createRule}>Create Rule</button>
        </div>
    </div>

    <div className="evaluateRule">
        <h2>Evaluate Rule</h2>
        <div className="inside">
            <input 
                type="text" 
                placeholder="Age" 
                value={evaluationData.age}
                onChange={(e) => setEvaluationData({ ...evaluationData, age: e.target.value })} 
            />
            <input 
                type="text" 
                placeholder="Department" 
                value={evaluationData.department}
                onChange={(e) => setEvaluationData({ ...evaluationData, department: e.target.value })} 
            />
            <input 
                type="text" 
                placeholder="Salary" 
                value={evaluationData.salary}
                onChange={(e) => setEvaluationData({ ...evaluationData, salary: e.target.value })} 
            />
            <input 
                type="text" 
                placeholder="Experience" 
                value={evaluationData.experience}
                onChange={(e) => setEvaluationData({ ...evaluationData, experience: e.target.value })} 
            />
            <button onClick={evaluateRule}>Evaluate Rule</button>

            {result !== null && (
                <div className="result-container">
                    <p className="evaluation-result">
                        <strong>Evaluation Result:</strong> {result ? 'True' : 'False'}
                    </p>
                </div>
            )}
        </div>
    </div>

    <div className="combineRules">
        <h2>Combine Rules</h2>
        <div className="inside">
            {rules.length === 0 ? (
                <p>No rules available to combine.</p>
            ) : (
                rules.map((rule) => (
                    <div key={rule.ruleId} className='rulesBox'>
                        <input 
                            type="checkbox" 
                            id={rule.ruleId} 
                            onChange={() => handleCheckboxChange(rule.ruleId)} 
                        />
                        <label htmlFor={rule.ruleId}>{rule.ruleId}</label>
                    </div>
                ))
            )}
            <button onClick={combineRules}>Combine Selected Rules</button>
            {combinedResult && <pre>{JSON.stringify(combinedResult, null, 2)}</pre>}
        </div>
    </div>
</div>

    );
}

export default App;

