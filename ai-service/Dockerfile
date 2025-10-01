FROM python:3.11-alpine

WORKDIR /app

# Install minimal dependencies
RUN apk add --no-cache curl

# Install Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Create non-root user
RUN adduser -D -u 1001 aiuser
USER aiuser

COPY --chown=aiuser:aiuser app/ ./app/

EXPOSE 8000

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]