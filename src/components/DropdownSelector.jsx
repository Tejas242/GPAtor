import React, { useState } from "react";
import subjects from "../subjects";
import grades from "../grades";
import SelectedSubjectItem from "./SelectedSubjectItem";
import "../styles.css"; // Import the CSS file

const DropdownSelector = () => {
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [currentSubject, setCurrentSubject] = useState("");
  const [currentGrade, setCurrentGrade] = useState("");
  const [GPA, setGPA] = useState(0);

  const calculateGPA = (selectedSubjects) => {
    let totalCredits = 0;
    let totalGradePoints = 0;

    selectedSubjects.forEach((subjectInfo) => {
      totalCredits += subjectInfo.credits;
      totalGradePoints += subjectInfo.credits * subjectInfo.gradePoint;
    });

    return totalCredits > 0 ? (totalGradePoints / totalCredits).toFixed(2) : 0;
  };

  const handleSubjectChange = (event) => {
    setCurrentSubject(event.target.value);
  };

  const handleGradeChange = (event) => {
    setCurrentGrade(event.target.value);
  };

  const handleAddSubject = () => {
    if (currentSubject && currentGrade) {
      const selectedSubject = subjects.find(
        (subj) => subj.name === currentSubject
      );
      const selectedGrade = grades.find((gr) => gr.grade === currentGrade);

      if (selectedSubject && selectedGrade) {
        const subjectInfo = {
          name: selectedSubject.name,
          credits: selectedSubject.credits,
          grade: selectedGrade.grade,
          gradePoint: selectedGrade.points
        };
        const updatedSelectedSubjects = [...selectedSubjects, subjectInfo];
        setSelectedSubjects(updatedSelectedSubjects);
        setCurrentSubject("");
        setCurrentGrade("");

        const calculatedGPA = calculateGPA(updatedSelectedSubjects);
        setGPA(calculatedGPA);
      }
    }
  };

  const handleRemoveSubject = (subjectToRemove) => {
    const updatedSelectedSubjects = selectedSubjects.filter(
      (subject) => subject !== subjectToRemove
    );
    setSelectedSubjects(updatedSelectedSubjects);

    const calculatedGPA = calculateGPA(updatedSelectedSubjects);
    setGPA(calculatedGPA);
  };

  return (
    <div className="container">
      <div className="gpa">Your GPA is: {GPA}</div>
      <div className="flex mb-4">
        <select
          className="select-style"
          value={currentSubject}
          onChange={handleSubjectChange}
        >
          <option value="">Select a subject</option>
          {subjects.map((subject) => (
            <option key={subject.courseCode} value={subject.name}>
              {subject.name}
            </option>
          ))}
        </select>
        <select
          className="select-style"
          value={currentGrade}
          onChange={handleGradeChange}
        >
          <option value="">Select a grade</option>
          {grades.map((gradeObj) => (
            <option key={gradeObj.grade} value={gradeObj.grade}>
              {gradeObj.grade}
            </option>
          ))}
        </select>
        <button className="button-style" onClick={handleAddSubject}>
          Add
        </button>
      </div>
      <div>
        <h2 className="text-lg font-semibold mb-2">Selected Subjects:</h2>
        <ul>
          {selectedSubjects.map((subject, index) => (
            <SelectedSubjectItem
              key={index}
              subject={subject}
              onRemove={handleRemoveSubject}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DropdownSelector;
