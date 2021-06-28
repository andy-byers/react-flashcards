import "./ProgressBar.scss";

function ProgressBar({ progress }) {
  return (
    <div className="ProgressBar">
      <div style={{ width: `${progress * 100}%` }} />
    </div>
  );
}

export default ProgressBar;
