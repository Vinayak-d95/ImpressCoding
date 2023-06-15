import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const ResumeBuilder = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [education, setEducation] = useState([{ institute: '', year: '', degree: '' }]);
  const [experience, setExperience] = useState([{ company: '', year: '', designation: '' }]);
  const [skills, setSkills] = useState([]);
  const [skillInput, setSkillInput] = useState('');

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };

  const handlePhoneChange = (event) => {
    setPhone(event.target.value);
  };

  const handleEducationChange = (index, event) => {
    const { name, value } = event.target;
    const updatedEducation = [...education];
    updatedEducation[index][name] = value;
    setEducation(updatedEducation);
  };

  const handleExperienceChange = (index, event) => {
    const { name, value } = event.target;
    const updatedExperience = [...experience];
    updatedExperience[index][name] = value;
    setExperience(updatedExperience);
  };

  const handleSkillInputChange = (event) => {
    setSkillInput(event.target.value);
  };

  const handleSkillAdd = () => {
    if (skillInput.trim() !== '' && !skills.includes(skillInput)) {
      setSkills([...skills, skillInput]);
      setSkillInput('');
    }
  };

  const handleSkillDelete = (skill) => {
    const updatedSkills = skills.filter((s) => s !== skill);
    setSkills(updatedSkills);
  };

  const handleEducationAdd = () => {
    setEducation([...education, { institute: '', year: '', degree: '' }]);
  };

  const handleEducationDelete = (index) => {
    const updatedEducation = [...education];
    updatedEducation.splice(index, 1);
    setEducation(updatedEducation);
  };

  const handleExperienceAdd = () => {
    setExperience([...experience, { company: '', year: '', designation: '' }]);
  };

  const handleExperienceDelete = (index) => {
    const updatedExperience = [...experience];
    updatedExperience.splice(index, 1);
    setExperience(updatedExperience);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Perform any necessary actions with the form data (e.g., save it to a database, generate a PDF, etc.)
  };

  return (
    <div className="container">
      <h1>Resume Builder</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="name">
          <Form.Label>Name:</Form.Label>
          <Form.Control type="text" value={name} onChange={handleNameChange} />
        </Form.Group>

        <Form.Group controlId="email">
          <Form.Label>Email:</Form.Label>
          <Form.Control type="email" value={email} onChange={handleEmailChange} />
        </Form.Group>

        <Form.Group controlId="address">
          <Form.Label>Address:</Form.Label>
          <Form.Control type="text" value={address} onChange={handleAddressChange} />
        </Form.Group>

        <Form.Group controlId="phone">
          <Form.Label>Phone:</Form.Label>
          <Form.Control type="tel" value={phone} onChange={handlePhoneChange} />
        </Form.Group>

        <Form.Group controlId="education">
          <Form.Label>Education:</Form.Label>
          {education.map((edu, index) => (
            <div key={index}>
              <Form.Control
                type="text"
                placeholder="Institute"
                name="institute"
                value={edu.institute}
                onChange={(event) => handleEducationChange(index, event)}
              />
              <Form.Control
                type="text"
                placeholder="Year"
                name="year"
                value={edu.year}
                onChange={(event) => handleEducationChange(index, event)}
              />
              <Form.Control
                type="text"
                placeholder="Degree"
                name="degree"
                value={edu.degree}
                onChange={(event) => handleEducationChange(index, event)}
              />
              {index === education.length - 1 && (
                <Button variant="link" onClick={handleEducationAdd}>
                  Add More
                </Button>
              )}
              {index !== education.length - 1 && (
                <Button variant="link" onClick={() => handleEducationDelete(index)}>
                  Remove
                </Button>
              )}
            </div>
          ))}
        </Form.Group>

        <Form.Group controlId="experience">
          <Form.Label>Experience:</Form.Label>
          {experience.map((exp, index) => (
            <div key={index}>
              <Form.Control
                type="text"
                placeholder="Company"
                name="company"
                value={exp.company}
                onChange={(event) => handleExperienceChange(index, event)}
              />
              <Form.Control
                type="text"
                placeholder="Year"
                name="year"
                value={exp.year}
                onChange={(event) => handleExperienceChange(index, event)}
              />
              <Form.Control
                type="text"
                placeholder="Designation"
                name="designation"
                value={exp.designation}
                onChange={(event) => handleExperienceChange(index, event)}
              />
              {index === experience.length - 1 && (
                <Button variant="link" onClick={handleExperienceAdd}>
                  Add More
                </Button>
              )}
              {index !== experience.length - 1 && (
                <Button variant="link" onClick={() => handleExperienceDelete(index)}>
                  Remove
                </Button>
              )}
            </div>
          ))}
        </Form.Group>

        <Form.Group controlId="skills">
          <Form.Label>Skills:</Form.Label>
          <div className="mb-3">
            <Form.Control
              type="text"
              placeholder="Add a skill"
              value={skillInput}
              onChange={handleSkillInputChange}
            />
            <Button variant="secondary" onClick={handleSkillAdd}>
              Add Skill
            </Button>
          </div>
          <div className="d-flex flex-wrap">
            {skills.map((skill, index) => (
              <span key={index} className="badge badge-primary mr-2 mb-2">
                {skill}
                <button
                  type="button"
                  className="close ml-1"
                  onClick={() => handleSkillDelete(skill)}
                >
                  <span>&times;</span>
                </button>
              </span>
            ))}
          </div>
        </Form.Group>

        <Button variant="primary" type="submit">
          Generate Resume
        </Button>
      </Form>
    </div>
  );
};

export default ResumeBuilder;
