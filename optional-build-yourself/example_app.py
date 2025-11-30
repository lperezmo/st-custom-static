import time
import streamlit as st

st.title("Custom Streamlit Test")

st.write("Watch the loading animation in the top-right corner when you click the button.")

if st.button("Simulate slow operation"):
    with st.spinner("Working..."):
        time.sleep(3)
    st.success("Done!")

# Create some widgets to trigger reruns
value = st.slider("Slide me to trigger rerun", 0, 100, 50)
st.write(f"Value: {value}")
