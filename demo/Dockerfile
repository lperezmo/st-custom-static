FROM python:3.11-slim

RUN useradd -m -u 1000 appuser

COPY --from=ghcr.io/astral-sh/uv:latest /uv /usr/local/bin/uv

WORKDIR /app

COPY pyproject.toml .
RUN uv pip install --system --no-cache -r pyproject.toml

# Bake the custom icon into the image at build time
RUN st-install --icon italic-h-sweep

COPY app.py .
COPY .streamlit .streamlit

USER appuser

EXPOSE 7860

HEALTHCHECK CMD curl --fail http://localhost:7860/_stcore/health || exit 1

CMD ["streamlit", "run", "app.py", \
     "--server.port=7860", \
     "--server.address=0.0.0.0", \
     "--server.headless=true"]
