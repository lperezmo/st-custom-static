FROM python:3.11-slim

RUN useradd -m -u 1000 appuser

WORKDIR /app

RUN pip install --no-cache-dir \
    streamlit==1.57.0 \
    pandas \
    altair \
    numpy \
    st-custom-static

# Bake the custom icon into the image at build time
RUN st-install --icon italic-h-sweep

COPY demo/app.py .
COPY demo/.streamlit .streamlit

USER appuser

EXPOSE 7860

HEALTHCHECK CMD curl --fail http://localhost:7860/_stcore/health || exit 1

CMD ["streamlit", "run", "app.py", \
     "--server.port=7860", \
     "--server.address=0.0.0.0", \
     "--server.headless=true"]
