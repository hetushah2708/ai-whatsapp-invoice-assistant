import ollama


def extract_invoice_data(text):

    prompt = f"""
You are an invoice extraction AI.

Extract these fields from the invoice text:

- vendor_name
- invoice_number
- total_amount

Return ONLY valid JSON.

Example format:

{{
  "vendor_name": "ABC Pvt Ltd",
  "invoice_number": "INV-12345",
  "total_amount": "551.58"
}}

If a field is missing, return null.

Invoice text:
{text}
"""

    response = ollama.chat(
        model='tinyllama',

        messages=[
            {
                'role': 'user',
                'content': prompt
            }
        ],

        options={
            "temperature": 0
        }
    )

    return response['message']['content']