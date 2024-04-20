const UserInput = ({ onChange, userInput }) => {
  return (
    <section id="user-input">
      <div className="input-group">
        <p>
          <label>초기 투자</label>
          <input
            type="text"
            required
            value={userInput.initialInvestment}
            onChange={(event) =>
              onChange('initialInvestment', event.target.value)
            }
          />
        </p>
        <p>
          <label>연간 투자</label>
          <input
            type="text"
            required
            value={userInput.annualInvestment}
            onChange={(event) =>
              onChange('annualInvestment', event.target.value)
            }
          />
        </p>
      </div>
      <div className="input-group">
        <p>
          <label>기대수익률</label>
          <input
            type="text"
            required
            value={userInput.expectedReturn}
            onChange={(event) => onChange('expectedReturn', event.target.value)}
          />
        </p>
        <p>
          <label>기간</label>
          <input
            type="text"
            required
            value={userInput.duration}
            onChange={(event) => onChange('duration', event.target.value)}
          />
        </p>
      </div>
    </section>
  );
};

export default UserInput;
