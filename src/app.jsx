function App() {
  return (
    <window.RefinedPortfolio
      data={window.PORTFOLIO}
      density="comfy"
      warmth={140}
    />
  );
}

ReactDOM.createRoot(document.getElementById('app')).render(<App />);
