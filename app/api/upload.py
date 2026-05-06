from fastapi import APIRouter
from fastapi import UploadFile
from fastapi import File
from fastapi import Depends

from sqlalchemy.orm import Session

import shutil
import os

from app.services.ocr_service import extract_text
from app.services.ai_extraction import extract_invoice_data

from app.db.session import get_db

from app.models.invoice import Invoice

router = APIRouter()

UPLOAD_DIR = "uploads"


@router.post("/upload")

async def upload_invoice(
    file: UploadFile = File(...),
    db: Session = Depends(get_db)
):

    file_path = os.path.join(UPLOAD_DIR, file.filename)

    with open(file_path, "wb") as buffer:

        shutil.copyfileobj(file.file, buffer)

    ocr_text = extract_text(file_path)

    structured_data = extract_invoice_data(ocr_text)

    invoice = Invoice(

        filename=file.filename,

        ocr_text=ocr_text,

        structured_data=structured_data,

        status="processed"
    )

    db.add(invoice)

    db.commit()

    db.refresh(invoice)

    return {
        "message": "Invoice processed successfully",
        "invoice_id": invoice.id,
        "filename": file.filename,
        "structured_data": structured_data
    }