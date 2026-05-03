import time

import altair as alt
import numpy as np
import pandas as pd
import streamlit as st
from st_custom_static import install, GITHUB_REPO


@st.cache_resource(show_spinner=False)
def _apply_icon() -> None:
    install("italic-h-sweep", None, GITHUB_REPO)


_apply_icon()

st.set_page_config(
    page_title="st-custom-static",
    layout="wide",
)

st.title("st-custom-static")
st.caption(
    "Custom loading animations for Streamlit. The spinner in the top-right uses a custom icon."
)


@st.cache_data(show_spinner="Generating data...")
def make_series(n: int, seed: int) -> pd.DataFrame:
    time.sleep(1.2)
    rng = np.random.default_rng(seed)
    dates = pd.date_range("2023-01-01", periods=n, freq="D")
    categories = ["Alpha", "Beta", "Gamma"]
    frames = []
    for i, cat in enumerate(categories):
        vals = np.cumsum(rng.standard_normal(n)) + (i + 1) * 30
        frames.append(pd.DataFrame({"date": dates, "value": vals, "series": cat}))
    return pd.concat(frames, ignore_index=True)


@st.cache_data(show_spinner="Running simulation...")
def run_simulation(n_steps: int, volatility: float, seed: int) -> pd.DataFrame:
    time.sleep(1.8)
    rng = np.random.default_rng(seed)
    steps = rng.standard_normal(n_steps) * volatility
    price = 100.0 + np.cumsum(steps)
    return pd.DataFrame({"step": range(n_steps), "price": price})


with st.sidebar:
    st.header("Settings")
    mode = st.radio("Mode", ["Time series", "Simulation"], label_visibility="collapsed")

    if mode == "Time series":
        n_days = st.slider("Days", 90, 730, 365)
        seed = st.number_input("Seed", value=42, step=1)
        if st.button("Reload", use_container_width=True):
            st.cache_data.clear()
    else:
        n_steps = st.slider("Steps", 100, 2000, 500)
        volatility = st.slider("Volatility", 0.5, 5.0, 1.5)
        seed = st.number_input("Seed", value=42, step=1)
        if st.button("Run", use_container_width=True):
            st.cache_data.clear()

    st.divider()
    st.caption("Install the custom icon:")
    st.code(
        "pip install git+https://github.com/lperezmo/st-custom-static\nst-install --icon italic-h-sweep",
        language="bash",
    )

if mode == "Time series":
    df = make_series(n_days, seed)

    chart = (
        alt.Chart(df)
        .mark_line(strokeWidth=1.5)
        .encode(
            x=alt.X("date:T", title=None),
            y=alt.Y("value:Q", title="Value"),
            color=alt.Color("series:N", title="Series"),
        )
        .properties(height=420)
        .interactive()
    )
    st.altair_chart(chart, use_container_width=True)

    summary = (
        df.groupby("series")["value"]
        .agg(["mean", "std", "min", "max"])
        .rename(columns={"mean": "Mean", "std": "Std Dev", "min": "Min", "max": "Max"})
        .round(2)
    )
    st.dataframe(summary, use_container_width=True)

else:
    sim = run_simulation(n_steps, volatility, seed)

    chart = (
        alt.Chart(sim)
        .mark_area(
            line={"strokeWidth": 1.5},
            fillOpacity=0.15,
        )
        .encode(
            x=alt.X("step:Q", title="Step"),
            y=alt.Y("price:Q", title="Price"),
        )
        .properties(height=420)
        .interactive()
    )
    st.altair_chart(chart, use_container_width=True)

    col1, col2, col3 = st.columns(3)
    col1.metric("Final price", f"{sim['price'].iloc[-1]:.2f}")
    col2.metric("Peak", f"{sim['price'].max():.2f}")
    col3.metric("Trough", f"{sim['price'].min():.2f}")
