const studentDB = [
  { name: "Aman", skills: ["Python", "UI/UX"], interests: ["AI", "Design"] },
  { name: "Sneha", skills: ["JavaScript", "ML"], interests: ["AI", "Web"] },
  { name: "Rahul", skills: ["C++", "Cybersecurity"], interests: ["Security", "Ethical Hacking"] },
  { name: "Priya", skills: ["React", "Node.js"], interests: ["Web", "App Dev"] },
  { name: "Neha", skills: ["Java", "DBMS"], interests: ["Backend", "Cloud"] }
];

// PROFILE PAGE
if (document.getElementById('profileForm')) {
  document.getElementById('profileForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const skills = document.getElementById('skills').value.split(',').map(s => s.trim().toLowerCase());
    const interests = document.getElementById('interests').value.split(',').map(i => i.trim().toLowerCase());

    const userData = { name, skills, interests };
    localStorage.setItem('userData', JSON.stringify(userData));
    window.location.href = 'match.html';
  });
}

// MATCH PAGE
if (window.location.pathname.includes('match.html')) {
  const user = JSON.parse(localStorage.getItem('userData'));
  const resultDiv = document.getElementById('results');

  const getMatchScore = (student) => {
    let score = 0;
    student.skills.forEach(skill => {
      if (user.skills.includes(skill.toLowerCase())) score++;
    });
    student.interests.forEach(interest => {
      if (user.interests.includes(interest.toLowerCase())) score++;
    });
    return score;
  };

  const matched = studentDB
    .map(student => ({ ...student, score: getMatchScore(student) }))
    .filter(student => student.score > 0)
    .sort((a, b) => b.score - a.score);

  if (matched.length > 0) {
    matched.forEach(m => {
      resultDiv.innerHTML += `
        <div class="match-card">
          <h3>${m.name}</h3>
          <p><strong>Skills:</strong> ${m.skills.join(', ')}</p>
          <p><strong>Interests:</strong> ${m.interests.join(', ')}</p>
          <div class="match-score">Match Score: ${m.score}</div>
        </div>
      `;
    });
  } else {
    resultDiv.innerHTML = "<p>No good matches found. Try different skills or interests!</p>";
  }
}
