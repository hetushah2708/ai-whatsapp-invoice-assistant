from fastapi import APIRouter
from fastapi import Depends

from sqlalchemy.orm import Session

from app.db.session import get_db

from app.models.invoice import Invoice

router = APIRouter()


@router.get("/invoices")

def get_invoices(db: Session = Depends(get_db)):

    invoices = db.query(Invoice).all()

    return invoices