from fastapi import FastAPI

from app.db.database import engine
from app.db.database import Base

from app.models.invoice import Invoice
from app.api.upload import router as upload_router
from app.api.invoices import router as invoice_router


Base.metadata.create_all(bind=engine)

app = FastAPI()

app.include_router(upload_router)
app.include_router(invoice_router)

@app.get("/")
def home():
    return {
        "message": "AI Invoice Assistant Running"
    }