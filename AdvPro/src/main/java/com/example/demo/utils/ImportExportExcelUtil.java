package com.example.demo.utils;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.text.NumberFormat;
import java.util.List;
import java.util.Locale;

import org.apache.poi.ss.usermodel.BorderStyle;
import org.apache.poi.ss.usermodel.FillPatternType;
import org.apache.poi.ss.usermodel.HorizontalAlignment;
import org.apache.poi.ss.usermodel.VerticalAlignment;
import org.apache.poi.ss.util.CellRangeAddress;
import org.apache.poi.ss.util.RegionUtil;
import org.apache.poi.xssf.usermodel.XSSFCell;
import org.apache.poi.xssf.usermodel.XSSFCellStyle;
import org.apache.poi.xssf.usermodel.XSSFColor;
import org.apache.poi.xssf.usermodel.XSSFCreationHelper;
import org.apache.poi.xssf.usermodel.XSSFFont;
import org.apache.poi.xssf.usermodel.XSSFRichTextString;
import org.apache.poi.xssf.usermodel.XSSFRow;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.stereotype.Component;

import com.example.demo.dto.OfferDto;
import com.example.demo.dto.OfferPayoutDto;
import com.example.demo.dto.ProductPayoutDto;
import com.example.demo.service.impl.OfferPayoutServiceImpl;
 

@Component
public class ImportExportExcelUtil {
	
	@Autowired
	OfferPayoutServiceImpl offerPayoutServiceImpl;

	public ByteArrayResource exporthistoryOfferPayoutToExcel(List<OfferPayoutDto> searchResult) throws IOException {
		XSSFWorkbook offerpayoutWorkbook = new XSSFWorkbook();
		XSSFSheet offerpayoutSheet = offerpayoutWorkbook.createSheet("OfferPayOut");
		XSSFCreationHelper createHelper = offerpayoutWorkbook.getCreationHelper();
		Locale localeEN = new Locale("en", "EN");
		NumberFormat en = NumberFormat.getInstance(localeEN);
		int titleRowNumber = 0;
		int tableHeadRowNumber = 3;
		int tableDataRowNumber = 4;

		/* Tạo font */
		XSSFFont fontBold = offerpayoutWorkbook.createFont();
		fontBold.setBold(true); // set bold
		fontBold.setFontHeight(10); // add font size

		XSSFFont fontBoldTitle = offerpayoutWorkbook.createFont();
		fontBoldTitle.setBold(true); // set bold
		fontBoldTitle.setFontHeight(15); // add font size

		/* Tạo color */
		XSSFColor tableHeadColor = new XSSFColor(java.awt.Color.YELLOW); // Yellow

		/* Tạo cell style */
		XSSFCellStyle titleCellStyle = offerpayoutWorkbook.createCellStyle();
		titleCellStyle.setVerticalAlignment(VerticalAlignment.CENTER);
		titleCellStyle.setAlignment(HorizontalAlignment.CENTER);
		titleCellStyle.setFont(fontBoldTitle);

		XSSFCellStyle tableHeadCellStyle = offerpayoutWorkbook.createCellStyle();
		tableHeadCellStyle.setFont(fontBold);
		tableHeadCellStyle.setBorderBottom(BorderStyle.THIN);
		tableHeadCellStyle.setBorderTop(BorderStyle.THIN);
		tableHeadCellStyle.setBorderLeft(BorderStyle.THIN);
		tableHeadCellStyle.setBorderRight(BorderStyle.THIN);
		tableHeadCellStyle.setFillForegroundColor(tableHeadColor);
		tableHeadCellStyle.setFillBackgroundColor(tableHeadColor);
		tableHeadCellStyle.setFillPattern(FillPatternType.SOLID_FOREGROUND);
		tableHeadCellStyle.setDataFormat(createHelper.createDataFormat().getFormat("MMMM-dd-yyyy"));
		tableHeadCellStyle.setAlignment(HorizontalAlignment.CENTER);
		XSSFCellStyle tableDataCellStyle = offerpayoutWorkbook.createCellStyle();
		tableDataCellStyle.setBorderBottom(BorderStyle.THIN);
		tableDataCellStyle.setBorderTop(BorderStyle.THIN);
		tableDataCellStyle.setBorderLeft(BorderStyle.THIN);
		tableDataCellStyle.setBorderRight(BorderStyle.THIN);
		tableDataCellStyle.setAlignment(HorizontalAlignment.LEFT);
		tableDataCellStyle.setDataFormat(createHelper.createDataFormat().getFormat("MMMM-dd-yyyy"));
		XSSFCellStyle tableDataCellStyle2 = offerpayoutWorkbook.createCellStyle();
		tableDataCellStyle2.setBorderBottom(BorderStyle.THIN);
		tableDataCellStyle2.setBorderTop(BorderStyle.THIN);
		tableDataCellStyle2.setBorderLeft(BorderStyle.THIN);
		tableDataCellStyle2.setBorderRight(BorderStyle.THIN);
		tableDataCellStyle2.setAlignment(HorizontalAlignment.RIGHT);
		/* Tạo merge cells */
		offerpayoutSheet.addMergedRegion(new CellRangeAddress(titleRowNumber, titleRowNumber + 1, 0, 7));
		/* Tạo title */
		XSSFRow titleRow = offerpayoutSheet.createRow(titleRowNumber);
		XSSFCell titleCell = titleRow.createCell(0);
		titleCell.setCellStyle(titleCellStyle);
		XSSFRichTextString cellValueTitle = new XSSFRichTextString();

		cellValueTitle.append("List Offer Pay Out History");

		titleCell.setCellValue(cellValueTitle);

		/* Tạo các table head */
		XSSFRichTextString headCellValue0 = new XSSFRichTextString();
		XSSFRichTextString headCellValue1 = new XSSFRichTextString();
		XSSFRichTextString headCellValue2 = new XSSFRichTextString();
		XSSFRichTextString headCellValue3 = new XSSFRichTextString();
		XSSFRichTextString headCellValue4 = new XSSFRichTextString();
		XSSFRichTextString headCellValue5 = new XSSFRichTextString();
		XSSFRichTextString headCellValue6 = new XSSFRichTextString();
		XSSFRichTextString headCellValue7 = new XSSFRichTextString();
		XSSFRow tableHeadRow = offerpayoutSheet.createRow(tableHeadRowNumber);
		XSSFCell tableHeadCell;

		tableHeadCell = tableHeadRow.createCell(0);
		headCellValue0.append("No.");
		tableHeadCell.setCellValue(headCellValue0);
		tableHeadCell.setCellStyle(tableHeadCellStyle);

		tableHeadCell = tableHeadRow.createCell(1);
		headCellValue1.append("Modified Date");
		tableHeadCell.setCellValue(headCellValue1);
		tableHeadCell.setCellStyle(tableHeadCellStyle);

		tableHeadCell = tableHeadRow.createCell(2);
		headCellValue2.append("Modified By");
		tableHeadCell.setCellValue(headCellValue2);
		tableHeadCell.setCellStyle(tableHeadCellStyle);

		tableHeadCell = tableHeadRow.createCell(3);
		headCellValue3.append("Changed Payout");
		tableHeadCell.setCellValue(headCellValue3);
		tableHeadCell.setCellStyle(tableHeadCellStyle);

		tableHeadCell = tableHeadRow.createCell(4);
		headCellValue4.append("Apply Date");
		tableHeadCell.setCellValue(headCellValue4);
		tableHeadCell.setCellStyle(tableHeadCellStyle);

		tableHeadCell = tableHeadRow.createCell(5);
		headCellValue5.append("End Date");
		tableHeadCell.setCellValue(headCellValue5);
		tableHeadCell.setCellStyle(tableHeadCellStyle);

		tableHeadCell = tableHeadRow.createCell(6);
		headCellValue6.append("Default Payout");
		tableHeadCell.setCellValue(headCellValue6);
		tableHeadCell.setCellStyle(tableHeadCellStyle);
		
		tableHeadCell = tableHeadRow.createCell(7);
		headCellValue7.append("Note");
		tableHeadCell.setCellValue(headCellValue7);
		tableHeadCell.setCellStyle(tableHeadCellStyle);

		/* Tạo các hàng dữ liệu */
		XSSFRow tableDataRow;
		XSSFCell tableDataCell;
		String createDate, modifyDate, modifiedBy, applyDate, endDate, currentcyDefaultPayout, currentcyPayoutValue,
				payoutValue, defaultPayout,note;
		int numberOfOfferPayOut = searchResult.size();
		for (int i = 0; i < numberOfOfferPayOut; i++) {
			tableDataRow = offerpayoutSheet.createRow(i + tableDataRowNumber);

			 
			modifiedBy = searchResult.get(i).getModifiedBy();
			if (searchResult.get(i).getApplyDate() != null) {
				applyDate = (searchResult.get(i).getApplyDate().toString()).substring(0,
						(searchResult.get(i).getApplyDate().toString()).length() - 12);
			} else {
				applyDate = "";
			}
			
			if (searchResult.get(i).getEndDate() != null) {
				endDate = (searchResult.get(i).getEndDate().toString()).substring(0,
						(searchResult.get(i).getEndDate().toString()).length() - 10);
			} else {
				endDate = "";
			}
			
			if (searchResult.get(i).getOffer().getProduct().getCurrencyPayout() != null) {
				if(searchResult.get(i).getOffer().getProduct().getCurrencyPayout().equals("VND"))
				{
					currentcyDefaultPayout = "₫";
				}
				else if(searchResult.get(i).getOffer().getProduct().getCurrencyPayout().equals("USD"))
				{
					currentcyDefaultPayout = "$";
				}
				else if(searchResult.get(i).getOffer().getProduct().getCurrencyPayout().equals("IDR")) {
					currentcyDefaultPayout = "Rp";
				}
				else  {
					currentcyDefaultPayout = "Thb";
				}
			
			} else {
				currentcyDefaultPayout = "";
			}
			
			if ( searchResult.get(i).getCurrencyPayout() != null) {
				if(searchResult.get(i).getCurrencyPayout().equals("VND"))
				{
					currentcyPayoutValue = "₫";
				}
				else if(searchResult.get(i).getCurrencyPayout().equals("USD"))
				{
					currentcyPayoutValue = "$";
				}
				else if(searchResult.get(i).getCurrencyPayout().equals("IDR")) {
					currentcyPayoutValue = "Rp";
				}
				else {
					currentcyPayoutValue = "Thb";
				}
			} else {
				currentcyPayoutValue = "";
			}

			payoutValue = en.format(Long.parseLong((searchResult.get(i).getPayoutValue().toString()).substring(0,
					(searchResult.get(i).getPayoutValue().toString()).length() - 2))) + " " + currentcyPayoutValue;
			defaultPayout = en.format(Long.parseLong((searchResult.get(i).getOffer().getProduct().getCurrentPayout().toString()).substring(0,
					(searchResult.get(i).getOffer().getProduct().getCurrentPayout().toString()).length() - 2))) + " "
					+ currentcyDefaultPayout;
			note = searchResult.get(i).getNote();
			/* Đưa dữ liệu vào các cột */
			for (int j = 0; j < 8; j++) {
				tableDataCell = tableDataRow.createCell(j);
		
				switch (j) {
				case 0:
					tableDataCell.setCellValue(i + 1);
					tableDataCell.setCellStyle(tableDataCellStyle2);
					break;
				case 1: 
					tableDataCell.setCellStyle(tableDataCellStyle);
					break;
				case 2:
					tableDataCell.setCellValue(modifiedBy);
					tableDataCell.setCellStyle(tableDataCellStyle);
					break;
				case 3:
					tableDataCell.setCellValue(payoutValue);
					tableDataCell.setCellStyle(tableDataCellStyle2);
					break;
				case 4:
					tableDataCell.setCellValue(applyDate);
					tableDataCell.setCellStyle(tableDataCellStyle);
					break;
				case 5:
					tableDataCell.setCellValue(endDate);
					tableDataCell.setCellStyle(tableDataCellStyle);
					break;

				case 6:
					tableDataCell.setCellValue(defaultPayout);
					tableDataCell.setCellStyle(tableDataCellStyle2);
					break;
					
				case 7:
					tableDataCell.setCellValue(note);
					tableDataCell.setCellStyle(tableDataCellStyle);
					break;
				default:
					break;
				}
			}
		}

		/* Chỉnh lại độ rộng các cột */
		for (int i = 0; i < 8; i++) {
			offerpayoutSheet.autoSizeColumn(i);
		}

		/* Viết ra file excel */
		ByteArrayOutputStream excelFile = new ByteArrayOutputStream();
		offerpayoutWorkbook.write(excelFile);
		offerpayoutWorkbook.close();
		return new ByteArrayResource(excelFile.toByteArray());
	}

	public ByteArrayResource exporthistoryOfferPayoutToExcelByAgency(List<OfferDto> searchResult) throws IOException {
		XSSFWorkbook offerpayoutWorkbook = new XSSFWorkbook();
		XSSFSheet offerpayoutSheet = offerpayoutWorkbook.createSheet("OfferPayOut");
		XSSFCreationHelper createHelper = offerpayoutWorkbook.getCreationHelper();
		Locale localeEN = new Locale("en", "EN");
		NumberFormat en = NumberFormat.getInstance(localeEN);
		/* Tạo font */
		XSSFFont fontBold = offerpayoutWorkbook.createFont();
		fontBold.setBold(true); // set bold
		fontBold.setFontHeight(10); // add font size

		XSSFFont fontBoldTitle = offerpayoutWorkbook.createFont();
		fontBoldTitle.setBold(true); // set bold
		fontBoldTitle.setFontHeight(15); // add font size

		/* Tạo color */
		XSSFColor tableHeadColor = new XSSFColor(java.awt.Color.YELLOW); // Yellow
		XSSFColor tableCellHeadColor = new XSSFColor(java.awt.Color.ORANGE); // Yellow

		/* Tạo cell style */
		XSSFCellStyle titleCellStyle = offerpayoutWorkbook.createCellStyle();
		titleCellStyle.setVerticalAlignment(VerticalAlignment.CENTER);
		titleCellStyle.setAlignment(HorizontalAlignment.CENTER);
		titleCellStyle.setFont(fontBoldTitle);

		XSSFCellStyle tableHeadCellStyle = offerpayoutWorkbook.createCellStyle();
		tableHeadCellStyle.setFont(fontBold);
		tableHeadCellStyle.setBorderBottom(BorderStyle.THIN);
		tableHeadCellStyle.setBorderTop(BorderStyle.THIN);
		tableHeadCellStyle.setBorderLeft(BorderStyle.THIN);
		tableHeadCellStyle.setBorderRight(BorderStyle.THIN);
		tableHeadCellStyle.setFillForegroundColor(tableHeadColor);
		tableHeadCellStyle.setFillBackgroundColor(tableHeadColor);
		tableHeadCellStyle.setFillPattern(FillPatternType.SOLID_FOREGROUND);
		tableHeadCellStyle.setAlignment(HorizontalAlignment.CENTER);
		tableHeadCellStyle.setDataFormat(createHelper.createDataFormat().getFormat("MMMM-dd-yyyy"));

		XSSFCellStyle tableDataCellStyleHead = offerpayoutWorkbook.createCellStyle();
		tableDataCellStyleHead.setFont(fontBold);
		tableDataCellStyleHead.setBorderBottom(BorderStyle.THIN);
		tableDataCellStyleHead.setBorderTop(BorderStyle.THIN);
		tableDataCellStyleHead.setBorderLeft(BorderStyle.THIN);
		tableDataCellStyleHead.setBorderRight(BorderStyle.THIN);
		tableDataCellStyleHead.setFillForegroundColor(tableCellHeadColor);
		tableDataCellStyleHead.setFillBackgroundColor(tableCellHeadColor);
		tableDataCellStyleHead.setAlignment(HorizontalAlignment.CENTER);
		tableDataCellStyleHead.setFillPattern(FillPatternType.SOLID_FOREGROUND);
		tableDataCellStyleHead.setDataFormat(createHelper.createDataFormat().getFormat("MMMM-dd-yyyy"));

		XSSFCellStyle tableDataCellStyle = offerpayoutWorkbook.createCellStyle();
		tableDataCellStyle.setBorderBottom(BorderStyle.THIN);
		tableDataCellStyle.setBorderTop(BorderStyle.THIN);
		tableDataCellStyle.setBorderLeft(BorderStyle.THIN);
		tableDataCellStyle.setBorderRight(BorderStyle.THIN);
		tableDataCellStyle.setAlignment(HorizontalAlignment.LEFT);
		XSSFCellStyle tableDataCellStyle2 = offerpayoutWorkbook.createCellStyle();
		tableDataCellStyle2.setBorderBottom(BorderStyle.THIN);
		tableDataCellStyle2.setBorderTop(BorderStyle.THIN);
		tableDataCellStyle2.setBorderLeft(BorderStyle.THIN);
		tableDataCellStyle2.setBorderRight(BorderStyle.THIN);
		tableDataCellStyle2.setAlignment(HorizontalAlignment.RIGHT);
//		tableDataCellStyle.setAlignment(HorizontalAlignment.LEFT);

		/* Tạo merge cells */

		/* Tạo các hàng dữ liệu */
		XSSFRow tableDataRow;
		XSSFCell tableDataCell;
		int countRow = 0;
		int boderFirst =0;
		int boderLate = 0;
		String currentcyPayout , currentcyPrice , currentcyPayoutValue , currentcyDefaultPayout;
		for (OfferDto cell : searchResult) {
			boderFirst = countRow;
			XSSFRow titleRow = offerpayoutSheet.createRow(countRow);
			offerpayoutSheet.addMergedRegion(new CellRangeAddress(countRow, countRow, 0, 7));
			/* Tạo title */
			XSSFCell titleCell = titleRow.createCell(0);
			titleCell.setCellStyle(titleCellStyle);

			titleCell.setCellValue("List Offer Payout History of Offer " + cell.getProduct().getName());

			countRow++;
			/* Tạo các table head */
			titleRow = offerpayoutSheet.createRow(countRow);
			XSSFCell tableHeadCell;

			tableHeadCell = titleRow.createCell(0);
			tableHeadCell.setCellValue("Offer Name    ");
			tableHeadCell.setCellStyle(tableHeadCellStyle);

			tableHeadCell = titleRow.createCell(1);
			tableHeadCell.setCellValue("Create Date         ");
			tableHeadCell.setCellStyle(tableHeadCellStyle);

			tableHeadCell = titleRow.createCell(2);
			tableHeadCell.setCellValue("Price      ");
			tableHeadCell.setCellStyle(tableHeadCellStyle);

			tableHeadCell = titleRow.createCell(3);
			tableHeadCell.setCellValue("Current Payout     ");
			tableHeadCell.setCellStyle(tableHeadCellStyle);

	

			tableHeadCell = titleRow.createCell(4);
			tableHeadCell.setCellValue("Description         ");
			tableHeadCell.setCellStyle(tableHeadCellStyle);
			
			tableHeadCell = titleRow.createCell(5);
			tableHeadCell.setCellValue("Note        ");
			tableHeadCell.setCellStyle(tableHeadCellStyle);
			countRow++;

			tableDataRow = offerpayoutSheet.createRow(countRow);

			for (int j = 0; j < 6; j++) {
				tableDataCell = tableDataRow.createCell(j);
				tableDataCell.setCellStyle(tableDataCellStyle);
				if ( cell.getProduct().getCurrency() != null) {
					if(cell.getProduct().getCurrency().equals("VND"))
					{
						currentcyPrice = "₫";
					}
					else if(cell.getProduct().getCurrency().equals("USD"))
					{
						currentcyPrice = "$";
					}
					else if(cell.getProduct().getCurrency().equals("IDR")) {
						currentcyPrice = "Rp";
					}
					else {
						currentcyPrice = "Thb";
					}
				} else {
					currentcyPrice = "";
				}
				
				if ( cell.getProduct().getCurrencyPayout() != null) {
					if(cell.getProduct().getCurrencyPayout().equals("VND"))
					{
						currentcyPayout = "₫";
					}
					else if(cell.getProduct().getCurrencyPayout().equals("USD"))
					{
						currentcyPayout = "$";
					}
					else if(cell.getProduct().getCurrencyPayout().equals("IDR")) {
						currentcyPayout = "Rp";
					}
					else {
						currentcyPayout = "Thb";
					}
				} else {
					currentcyPayout = "";
				}
				switch (j) {
				case 0:
					tableDataCell.setCellValue(cell.getProduct().getName());
					break;
				case 1:  
					tableDataCell.setCellStyle(tableDataCellStyle);
					break;
				case 2:
					tableDataCell.setCellValue(en.format(Long.parseLong((cell.getProduct().getPrice().toString()).substring(0,
							(cell.getProduct().getPrice().toString()).length() - 2))) + " " + currentcyPrice);
					tableDataCell.setCellStyle(tableDataCellStyle2);
					break;
				case 3:
					tableDataCell.setCellValue(	en.format(Long.parseLong((cell.getPayoutValue().toString()).substring(0,
							(cell.getPayoutValue().toString()).length() - 2))) + " " + currentcyPayout);
					tableDataCell.setCellStyle(tableDataCellStyle2);
					break;
				
		
				case 4:
					tableDataCell.setCellValue(cell.getProduct().getDescription());
					tableDataCell.setCellStyle(tableDataCellStyle);
					break;
				case 5:
					tableDataCell.setCellValue(cell.getNote());
					tableDataCell.setCellStyle(tableDataCellStyle);
					break;
				default:
					break;
				}
			}

			countRow++;
			offerpayoutSheet.addMergedRegion(new CellRangeAddress(countRow, countRow, 0, 6));
			tableDataRow = offerpayoutSheet.createRow(countRow);
			/* Tạo title */
			titleCell = tableDataRow.createCell(0);
			titleCell.setCellStyle(titleCellStyle);
			titleCell.setCellValue("Detail History Offer" + cell.getProduct().getName());

			countRow++;

			titleRow = offerpayoutSheet.createRow(countRow);

			tableHeadCell = titleRow.createCell(0);
			tableHeadCell.setCellValue("Modified Date         ");
			tableHeadCell.setCellStyle(tableDataCellStyleHead);

			tableHeadCell = titleRow.createCell(1);
			tableHeadCell.setCellValue("Changed Payout      ");
			tableHeadCell.setCellStyle(tableDataCellStyleHead);

			tableHeadCell = titleRow.createCell(2);
			tableHeadCell.setCellValue("Apply Date     ");
			tableHeadCell.setCellStyle(tableDataCellStyleHead);

			tableHeadCell = titleRow.createCell(3);
			tableHeadCell.setCellValue("End Date   ");
			tableHeadCell.setCellStyle(tableDataCellStyleHead);

			tableHeadCell = titleRow.createCell(4);
			tableHeadCell.setCellValue("Default Payout    ");
			tableHeadCell.setCellStyle(tableDataCellStyleHead); 
			
			tableHeadCell = titleRow.createCell(5);
			tableHeadCell.setCellValue("Note    ");
			tableHeadCell.setCellStyle(tableDataCellStyleHead); 
			List<OfferPayoutDto> list = offerPayoutServiceImpl.getListHistoryOffer(cell.getId());
			
			for (OfferPayoutDto opd : list) {
				countRow++;
				tableDataRow = offerpayoutSheet.createRow(countRow);
				for (int j = 0; j < 6; j++) {
					tableDataCell = tableDataRow.createCell(j);
					tableDataCell.setCellStyle(tableDataCellStyle);
					if (opd.getCurrencyPayout() != null) {
						if(opd.getCurrencyPayout().equals("VND"))
						{
							currentcyPayoutValue = "₫";
						}
						else if(opd.getCurrencyPayout().equals("USD"))
						{
							currentcyPayoutValue = "$";
						}
						else if(opd.getCurrencyPayout().equals("IDR")) {
							currentcyPayoutValue = "Rp";
						}
						else {
							currentcyPayoutValue = "Thb";
						}
					} else {
						currentcyPayoutValue = "";
					}
			
					switch (j) {

					case 0:  
						tableDataCell.setCellStyle(tableDataCellStyle);
						break;
					case 1:
						tableDataCell.setCellValue(en.format(Long.parseLong((opd.getPayoutValue().toString()).substring(0,
								(opd.getPayoutValue().toString()).length() - 2))) + " " + currentcyPayoutValue);
						tableDataCell.setCellStyle(tableDataCellStyle2);
						break;
						
					case 2:
						tableDataCell.setCellValue("");
					 
						tableDataCell.setCellStyle(tableDataCellStyle);
						break;
					case 3:
						tableDataCell.setCellValue("");
					 
						tableDataCell.setCellStyle(tableDataCellStyle);
						break;
					case 4:
						tableDataCell.setCellValue("");
						for (ProductPayoutDto ppd : cell.getProduct().getProductPayouts()) {
							
							if (ppd.getProduct().getCurrencyPayout() != null) {
								if(ppd.getProduct().getCurrencyPayout().equals("VND"))
								{
									currentcyDefaultPayout = "₫";
								}
								else if(ppd.getProduct().getCurrencyPayout().equals("USD"))
								{
									currentcyDefaultPayout = "$";
								}
								else if(ppd.getProduct().getCurrencyPayout().equals("IDR")) {
									currentcyDefaultPayout = "Rp";
								}
								else {
									currentcyDefaultPayout = "Thb";
								}
							} else {
								currentcyDefaultPayout = "";
							}
							if (ppd.getIsCurrent()) {
								tableDataCell.setCellValue(
										en.format(Long.parseLong((ppd.getPayoutValue().toString()).substring(0,
												(ppd.getPayoutValue().toString()).length() - 2))) + " " + currentcyDefaultPayout);
								break;
							}
						}
						tableDataCell.setCellStyle(tableDataCellStyle2);
						break;
				
					case 5:
						tableDataCell.setCellValue("");
						tableDataCell.setCellStyle(tableDataCellStyle);
						break;
					default:
						break;
					}
				}
			}
			boderLate = countRow;
			setBorderMergerOutRight(boderFirst,boderLate,0,8,offerpayoutSheet);
			countRow++;
			tableDataRow = offerpayoutSheet.createRow(countRow);
			offerpayoutSheet.addMergedRegion(new CellRangeAddress(countRow, countRow, 0, 8));
			countRow++;
		}

		for (int i = 0; i < 8; i++) {
			offerpayoutSheet.autoSizeColumn(i);
		}

		/* Viết ra file excel */
		ByteArrayOutputStream excelFile = new ByteArrayOutputStream();
		offerpayoutWorkbook.write(excelFile);
		offerpayoutWorkbook.close();
		return new ByteArrayResource(excelFile.toByteArray());
	}
	
	public void setBorderMergerOutRight(int fRow, int lRow, int fCol, int lCol, XSSFSheet sheet) {
		CellRangeAddress region = new CellRangeAddress(fRow, lRow, fCol, lCol);
		RegionUtil.setBorderBottom(BorderStyle.THICK, region, sheet);
		RegionUtil.setBorderTop(BorderStyle.THICK, region, sheet);
		RegionUtil.setBorderRight(BorderStyle.THICK, region, sheet);
	}

}
