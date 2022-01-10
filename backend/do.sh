# aws sns publish --topic-arn arn:aws:sns:ap-south-1:546200268287:pg313creditnote --message '{"type":"CreditNoteHistoricalInvoiceNumberGenerationCron", "isCron":false ,"model":{"tableName":"yp_loan_fee_gst_invoice_fy1819"}}'
cd /home/vikas/code/production/tech/backend/v1/src/kbyp-lambda-go/cmd/lambda-main
aws lambda update-function-code --function-name pg313kbyp-main-lambda --zip-file fileb://main.zip
