<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
	xmlns:iz="http://www.projekat.org/izvestaj"
	xmlns:xs="http://www.w3.org/2001/XMLSchema"
	xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" version="2.0">
	<xsl:template match="/">
		<html>
		    <head>
		        <style>
		            body {
		                background-color: grey;
		            }
		         .c1 {
		            padding-left: 50pt;
		            margin: 0 auto;
		            margin-top: 20pt;
		            margin-bottom: 20pt;
		            background-color: white;
		            padding-right: 50pt;
		            padding-top: 60pt;
		            padding-bottom: 60pt;
		            box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
		            width: 595px;
		            height: 842px;
		            position: sticky;
		            top: 25pt;
		         }
		        
		         .c2 {
		            font-family: 'Times New Roman';
		            font-size: 12pt;
		            text-align: center;
		            margin-top: 0pt;
		            margin-bottom: 30pt;
		         }
		        
		         .c4 {
		            font-family: 'Times New Roman';
		            font-size: 11pt;
		            margin-bottom: 0pt;
		            margin-top: 50pt;
		         }
		        
		         .c29 {
		            text-indent: 0pt;
		            margin-top: 40pt;
		            margin-bottom: 30pt;
		            font-size: 11pt;
		            font-family: 'Times New Roman';
		         }
		        
		        .c30 {
		            width: 50%;
		            margin-left: 2px;
		            display: inline-block;
		        }
		        
		        table, th, td {
				  	border: 1px solid black;
				  	border-collapse: collapse;
				  	text-align: justify;
		            font-family: serif;
		            font-size: 11pt;
		            font-family: 'Times New Roman';
				}
				th, td {
				  	padding: 5px;
				  	text-align: left;
				  	padding-left: 7px;
				}
		        </style>
		    </head>
		    <body style="background-color: grey;">
		    	 <xsl:variable name="currenttime"
							select="/iz:izvestaj/iz:datum_podnosenja" as="xs:date" />
		        <div style="padding-left: 50pt; margin: 0 auto; margin-top: 20pt; margin-bottom: 20pt; background-color: white; padding-right: 50pt; padding-top: 60pt; padding-bottom: 60pt; box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2); width: 600px; height: 850px; position: sticky; top: 25pt;">
		            <h4 style="font-family: 'Times New Roman'; font-size: 12pt; text-align: center; margin-top: 0pt; margin-bottom: 30pt;"><b>Примена Закона о слободном приступу информацијама од јавног значаја у <span><xsl:value-of select="format-date($currenttime,'[Y]')" /></span>. години </b></h4>
		            <p style="font-family: 'Times New Roman'; font-size: 11pt; margin-bottom: 0pt; margin-top: 50pt;"><b>1. Захтеви</b></p>
		            <table style="width:100%; margin-top: 10px; border: 1px solid black; border-collapse: collapse; text-align: justify; font-family: serif; font-size: 11pt; font-family: 'Times New Roman';">
					  	<tr>
					    	<th style="border: 1px solid black; border-collapse: collapse; text-align: justify; font-family: serif; font-size: 11pt; font-family: 'Times New Roman'; padding: 5px; text-align: left; padding-left: 7px;"></th>
					    	<th style="border: 1px solid black; border-collapse: collapse; text-align: justify; font-family: serif; font-size: 11pt; font-family: 'Times New Roman'; padding: 5px; text-align: left; padding-left: 7px;">Усвојени захтеви</th>
					    	<th style="border: 1px solid black; border-collapse: collapse; text-align: justify; font-family: serif; font-size: 11pt; font-family: 'Times New Roman'; padding: 5px; text-align: left; padding-left: 7px;">Одбијени захтеви</th>
				    		<th style="border: 1px solid black; border-collapse: collapse; text-align: justify; font-family: serif; font-size: 11pt; font-family: 'Times New Roman'; padding: 5px; text-align: left; padding-left: 7px;">Захтеви на које није одговорено</th>
				    		<th style="border: 1px solid black; border-collapse: collapse; text-align: justify; font-family: serif; font-size: 11pt; font-family: 'Times New Roman'; padding: 5px; text-align: left; padding-left: 7px;">Укупно</th>
					  	</tr>
					  	<tr>
					    	<td style="border: 1px solid black; border-collapse: collapse; text-align: justify; font-family: serif; font-size: 11pt; font-family: 'Times New Roman'; padding: 5px; text-align: left; padding-left: 7px;">Број захтева</td>
					    	<td style="border: 1px solid black; border-collapse: collapse; text-align: justify; font-family: serif; font-size: 11pt; font-family: 'Times New Roman'; padding: 5px; text-align: left; padding-left: 7px;">
					    		<xsl:choose>
									<xsl:when
										test="/iz:izvestaj/iz:podaci_o_zahtevima/iz:broj_usvojenih_zahteva = 0">
										/
									</xsl:when>
									<xsl:otherwise>
										<xsl:value-of select="/iz:izvestaj/iz:podaci_o_zahtevima/iz:broj_usvojenih_zahteva"></xsl:value-of>
									</xsl:otherwise>
								</xsl:choose>
					    	</td>
					    	<td style="border: 1px solid black; border-collapse: collapse; text-align: justify; font-family: serif; font-size: 11pt; font-family: 'Times New Roman'; padding: 5px; text-align: left; padding-left: 7px;">
					    		<xsl:choose>
									<xsl:when
										test="/iz:izvestaj/iz:podaci_o_zahtevima/iz:broj_odbijenih_zahteva = 0">
										/
									</xsl:when>
									<xsl:otherwise>
										<xsl:value-of select="/iz:izvestaj/iz:podaci_o_zahtevima/iz:broj_odbijenih_zahteva"></xsl:value-of>
									</xsl:otherwise>
								</xsl:choose>
							</td>
					    	<td style="border: 1px solid black; border-collapse: collapse; text-align: justify; font-family: serif; font-size: 11pt; font-family: 'Times New Roman'; padding: 5px; text-align: left; padding-left: 7px;">
					    		<xsl:choose>
									<xsl:when
										test="/iz:izvestaj/iz:podaci_o_zahtevima/iz:broj_zahteva_na_koje_nije_odgovoreno = 0">
										/
									</xsl:when>
									<xsl:otherwise>
										<xsl:value-of select="/iz:izvestaj/iz:podaci_o_zahtevima/iz:broj_zahteva_na_koje_nije_odgovoreno"></xsl:value-of>
									</xsl:otherwise>
								</xsl:choose>
							</td>
					    	<td style="border: 1px solid black; border-collapse: collapse; text-align: justify; font-family: serif; font-size: 11pt; font-family: 'Times New Roman'; padding: 5px; text-align: left; padding-left: 7px;">
					    		<xsl:choose>
									<xsl:when
										test="/iz:izvestaj/iz:podaci_o_zahtevima/iz:broj_usvojenih_zahteva + /iz:izvestaj/iz:podaci_o_zahtevima/iz:broj_odbijenih_zahteva + /iz:izvestaj/iz:podaci_o_zahtevima/iz:broj_zahteva_na_koje_nije_odgovoreno = 0">
										/
									</xsl:when>
									<xsl:otherwise>
										<xsl:value-of select="/iz:izvestaj/iz:podaci_o_zahtevima/iz:broj_usvojenih_zahteva + /iz:izvestaj/iz:podaci_o_zahtevima/iz:broj_odbijenih_zahteva + /iz:izvestaj/iz:podaci_o_zahtevima/iz:broj_zahteva_na_koje_nije_odgovoreno"></xsl:value-of>
									</xsl:otherwise>
								</xsl:choose>
							</td>
					  	</tr>
					  	<tr>
					    	<td style="border: 1px solid black; border-collapse: collapse; text-align: justify; font-family: serif; font-size: 11pt; font-family: 'Times New Roman'; padding: 5px; text-align: left; padding-left: 7px;">%</td>
					    	<td style="border: 1px solid black; border-collapse: collapse; text-align: justify; font-family: serif; font-size: 11pt; font-family: 'Times New Roman'; padding: 5px; text-align: left; padding-left: 7px;">
					    		<xsl:choose>
					    			<xsl:when
										test="/iz:izvestaj/iz:podaci_o_zahtevima/iz:broj_usvojenih_zahteva = 0">
										/
									</xsl:when>
									<xsl:when
										test="/iz:izvestaj/iz:podaci_o_zahtevima/iz:broj_usvojenih_zahteva + /iz:izvestaj/iz:podaci_o_zahtevima/iz:broj_odbijenih_zahteva + /iz:izvestaj/iz:podaci_o_zahtevima/iz:broj_zahteva_na_koje_nije_odgovoreno = 0">
										/
									</xsl:when>
									<xsl:otherwise>
										<xsl:value-of select="format-number((/iz:izvestaj/iz:podaci_o_zahtevima/iz:broj_usvojenih_zahteva div (/iz:izvestaj/iz:podaci_o_zahtevima/iz:broj_usvojenih_zahteva + /iz:izvestaj/iz:podaci_o_zahtevima/iz:broj_odbijenih_zahteva + /iz:izvestaj/iz:podaci_o_zahtevima/iz:broj_zahteva_na_koje_nije_odgovoreno))*100, '#.00')"></xsl:value-of>
									</xsl:otherwise>
								</xsl:choose>
					    	</td>
					    	<td style="border: 1px solid black; border-collapse: collapse; text-align: justify; font-family: serif; font-size: 11pt; font-family: 'Times New Roman'; padding: 5px; text-align: left; padding-left: 7px;">
					    		<xsl:choose>
					    			<xsl:when
										test="/iz:izvestaj/iz:podaci_o_zahtevima/iz:broj_odbijenih_zahteva = 0">
										/
									</xsl:when>
									<xsl:when
										test="/iz:izvestaj/iz:podaci_o_zahtevima/iz:broj_usvojenih_zahteva + /iz:izvestaj/iz:podaci_o_zahtevima/iz:broj_odbijenih_zahteva + /iz:izvestaj/iz:podaci_o_zahtevima/iz:broj_zahteva_na_koje_nije_odgovoreno = 0">
										/
									</xsl:when>
									<xsl:otherwise>
										<xsl:value-of select="format-number((/iz:izvestaj/iz:podaci_o_zahtevima/iz:broj_odbijenih_zahteva div (/iz:izvestaj/iz:podaci_o_zahtevima/iz:broj_usvojenih_zahteva + /iz:izvestaj/iz:podaci_o_zahtevima/iz:broj_odbijenih_zahteva + /iz:izvestaj/iz:podaci_o_zahtevima/iz:broj_zahteva_na_koje_nije_odgovoreno))*100, '#.00')"></xsl:value-of>
									</xsl:otherwise>
								</xsl:choose>
					    	</td>
					    	<td style="border: 1px solid black; border-collapse: collapse; text-align: justify; font-family: serif; font-size: 11pt; font-family: 'Times New Roman'; padding: 5px; text-align: left; padding-left: 7px;">
					    		<xsl:choose>
					    			<xsl:when
										test="/iz:izvestaj/iz:podaci_o_zahtevima/iz:broj_zahteva_na_koje_nije_odgovoreno = 0">
										/
									</xsl:when>
									<xsl:when
										test="/iz:izvestaj/iz:podaci_o_zahtevima/iz:broj_usvojenih_zahteva + /iz:izvestaj/iz:podaci_o_zahtevima/iz:broj_odbijenih_zahteva + /iz:izvestaj/iz:podaci_o_zahtevima/iz:broj_zahteva_na_koje_nije_odgovoreno = 0">
										/
									</xsl:when>
									<xsl:otherwise>
										<xsl:value-of select="format-number((/iz:izvestaj/iz:podaci_o_zahtevima/iz:broj_zahteva_na_koje_nije_odgovoreno div (/iz:izvestaj/iz:podaci_o_zahtevima/iz:broj_usvojenih_zahteva + /iz:izvestaj/iz:podaci_o_zahtevima/iz:broj_odbijenih_zahteva + /iz:izvestaj/iz:podaci_o_zahtevima/iz:broj_zahteva_na_koje_nije_odgovoreno))*100, '#.00')"></xsl:value-of>
									</xsl:otherwise>
								</xsl:choose>
					    	</td>
					  	</tr>
					</table>
		            <p style="font-family: 'Times New Roman'; font-size: 11pt; margin-bottom: 0pt; margin-top: 50pt;"><b>2. Жалбе</b></p>
		            <table style="width:100%; margin-top: 10px; border: 1px solid black; border-collapse: collapse; text-align: justify; font-family: serif; font-size: 11pt; font-family: 'Times New Roman';">
					  	<tr>
					    	<th style="border: 1px solid black; border-collapse: collapse; text-align: justify; font-family: serif; font-size: 11pt; font-family: 'Times New Roman'; padding: 5px; text-align: left; padding-left: 7px;"></th>
					    	<th style="border: 1px solid black; border-collapse: collapse; text-align: justify; font-family: serif; font-size: 11pt; font-family: 'Times New Roman'; padding: 5px; text-align: left; padding-left: 7px;" colspan="3">Жалбе на ћутање</th>
				    		<th style="border: 1px solid black; border-collapse: collapse; text-align: justify; font-family: serif; font-size: 11pt; font-family: 'Times New Roman'; padding: 5px; text-align: left; padding-left: 7px;" rowspan="2">Жалбе на одлуку</th>
				    		<th style="border: 1px solid black; border-collapse: collapse; text-align: justify; font-family: serif; font-size: 11pt; font-family: 'Times New Roman'; padding: 5px; text-align: left; padding-left: 7px;" rowspan="2">Укупно</th>
					  	</tr>
					  	<tr>
					    	<th style="border: 1px solid black; border-collapse: collapse; text-align: justify; font-family: serif; font-size: 11pt; font-family: 'Times New Roman'; padding: 5px; text-align: left; padding-left: 7px;"></th>
					    	<th style="border: 1px solid black; border-collapse: collapse; text-align: justify; font-family: serif; font-size: 11pt; font-family: 'Times New Roman'; padding: 5px; text-align: left; padding-left: 7px;">Није поступио</th>
					    	<th style="border: 1px solid black; border-collapse: collapse; text-align: justify; font-family: serif; font-size: 11pt; font-family: 'Times New Roman'; padding: 5px; text-align: left; padding-left: 7px;">Није поступио у целости</th>
				    		<th style="border: 1px solid black; border-collapse: collapse; text-align: justify; font-family: serif; font-size: 11pt; font-family: 'Times New Roman'; padding: 5px; text-align: left; padding-left: 7px;">Није поступио у законском року</th>
					  	</tr>
					  	<tr>
					    	<td style="border: 1px solid black; border-collapse: collapse; text-align: justify; font-family: serif; font-size: 11pt; font-family: 'Times New Roman'; padding: 5px; text-align: left; padding-left: 7px;">Број жалби</td>
					    	<td style="border: 1px solid black; border-collapse: collapse; text-align: justify; font-family: serif; font-size: 11pt; font-family: 'Times New Roman'; padding: 5px; text-align: left; padding-left: 7px;">
					    		<xsl:choose>
									<xsl:when
										test="/iz:izvestaj/iz:podaci_o_zalbama/iz:zalbe_na_cutanje/iz:nije_postupio = 0">
										/
									</xsl:when>
									<xsl:otherwise>
										<xsl:value-of select="/iz:izvestaj/iz:podaci_o_zalbama/iz:zalbe_na_cutanje/iz:nije_postupio"></xsl:value-of>
									</xsl:otherwise>
								</xsl:choose>
							</td>
					    	<td style="border: 1px solid black; border-collapse: collapse; text-align: justify; font-family: serif; font-size: 11pt; font-family: 'Times New Roman'; padding: 5px; text-align: left; padding-left: 7px;">
					    		<xsl:choose>
									<xsl:when
										test="/iz:izvestaj/iz:podaci_o_zalbama/iz:zalbe_na_cutanje/iz:nije_postupio_u_celosti = 0">
										/
									</xsl:when>
									<xsl:otherwise>
										<xsl:value-of select="/iz:izvestaj/iz:podaci_o_zalbama/iz:zalbe_na_cutanje/iz:nije_postupio_u_celosti"></xsl:value-of>
									</xsl:otherwise>
								</xsl:choose>
							</td>
					    	<td style="border: 1px solid black; border-collapse: collapse; text-align: justify; font-family: serif; font-size: 11pt; font-family: 'Times New Roman'; padding: 5px; text-align: left; padding-left: 7px;">
					    		<xsl:choose>
									<xsl:when
										test="/iz:izvestaj/iz:podaci_o_zalbama/iz:zalbe_na_cutanje/iz:nije_postupio_u_zakonskom_roku = 0">
										/
									</xsl:when>
									<xsl:otherwise>
										<xsl:value-of select="/iz:izvestaj/iz:podaci_o_zalbama/iz:zalbe_na_cutanje/iz:nije_postupio_u_zakonskom_roku"></xsl:value-of>
									</xsl:otherwise>
								</xsl:choose>
					    	</td>
					    	<td style="border: 1px solid black; border-collapse: collapse; text-align: justify; font-family: serif; font-size: 11pt; font-family: 'Times New Roman'; padding: 5px; text-align: left; padding-left: 7px;">
					    		<xsl:choose>
									<xsl:when
										test="/iz:izvestaj/iz:podaci_o_zalbama/iz:broj_zalbi_na_odluku = 0">
										/
									</xsl:when>
									<xsl:otherwise>
										<xsl:value-of select="/iz:izvestaj/iz:podaci_o_zalbama/iz:broj_zalbi_na_odluku"></xsl:value-of>
									</xsl:otherwise>
								</xsl:choose>
					    	</td>
					    	<td style="border: 1px solid black; border-collapse: collapse; text-align: justify; font-family: serif; font-size: 11pt; font-family: 'Times New Roman'; padding: 5px; text-align: left; padding-left: 7px;">
					    		<xsl:choose>
									<xsl:when
										test="/iz:izvestaj/iz:podaci_o_zalbama/iz:zalbe_na_cutanje/iz:nije_postupio + /iz:izvestaj/iz:podaci_o_zalbama/iz:zalbe_na_cutanje/iz:nije_postupio_u_celosti + /iz:izvestaj/iz:podaci_o_zalbama/iz:zalbe_na_cutanje/iz:nije_postupio_u_zakonskom_roku + /iz:izvestaj/iz:podaci_o_zalbama/iz:broj_zalbi_na_odluku = 0">
										/
									</xsl:when>
									<xsl:otherwise>
										<xsl:value-of select="/iz:izvestaj/iz:podaci_o_zalbama/iz:zalbe_na_cutanje/iz:nije_postupio + /iz:izvestaj/iz:podaci_o_zalbama/iz:zalbe_na_cutanje/iz:nije_postupio_u_celosti + /iz:izvestaj/iz:podaci_o_zalbama/iz:zalbe_na_cutanje/iz:nije_postupio_u_zakonskom_roku + /iz:izvestaj/iz:podaci_o_zalbama/iz:broj_zalbi_na_odluku"></xsl:value-of>
									</xsl:otherwise>
								</xsl:choose>
					    	</td>
					  	</tr>
					  	<tr>
					    	<td style="border: 1px solid black; border-collapse: collapse; text-align: justify; font-family: serif; font-size: 11pt; font-family: 'Times New Roman'; padding: 5px; text-align: left; padding-left: 7px;">%</td>
					    	<td style="border: 1px solid black; border-collapse: collapse; text-align: justify; font-family: serif; font-size: 11pt; font-family: 'Times New Roman'; padding: 5px; text-align: left; padding-left: 7px;">
					    		<xsl:choose>
					    			<xsl:when
										test="/iz:izvestaj/iz:podaci_o_zalbama/iz:zalbe_na_cutanje/iz:nije_postupio = 0">
										/
									</xsl:when>
									<xsl:when
										test="/iz:izvestaj/iz:podaci_o_zalbama/iz:zalbe_na_cutanje/iz:nije_postupio + /iz:izvestaj/iz:podaci_o_zalbama/iz:zalbe_na_cutanje/iz:nije_postupio_u_celosti + /iz:izvestaj/iz:podaci_o_zalbama/iz:zalbe_na_cutanje/iz:nije_postupio_u_zakonskom_roku + /iz:izvestaj/iz:podaci_o_zalbama/iz:broj_zalbi_na_odluku = 0">
										/
									</xsl:when>
									<xsl:otherwise>
										<xsl:value-of select="format-number((/iz:izvestaj/iz:podaci_o_zalbama/iz:zalbe_na_cutanje/iz:nije_postupio div (/iz:izvestaj/iz:podaci_o_zalbama/iz:zalbe_na_cutanje/iz:nije_postupio + /iz:izvestaj/iz:podaci_o_zalbama/iz:zalbe_na_cutanje/iz:nije_postupio_u_celosti + /iz:izvestaj/iz:podaci_o_zalbama/iz:zalbe_na_cutanje/iz:nije_postupio_u_zakonskom_roku + /iz:izvestaj/iz:podaci_o_zalbama/iz:broj_zalbi_na_odluku))*100, '#.00')"></xsl:value-of>
									</xsl:otherwise>
								</xsl:choose>
					    	</td>
					    	<td style="border: 1px solid black; border-collapse: collapse; text-align: justify; font-family: serif; font-size: 11pt; font-family: 'Times New Roman'; padding: 5px; text-align: left; padding-left: 7px;">
					    		<xsl:choose>
					    			<xsl:when
										test="/iz:izvestaj/iz:podaci_o_zalbama/iz:zalbe_na_cutanje/iz:nije_postupio_u_celosti = 0">
										/
									</xsl:when>
									<xsl:when
										test="/iz:izvestaj/iz:podaci_o_zalbama/iz:zalbe_na_cutanje/iz:nije_postupio + /iz:izvestaj/iz:podaci_o_zalbama/iz:zalbe_na_cutanje/iz:nije_postupio_u_celosti + /iz:izvestaj/iz:podaci_o_zalbama/iz:zalbe_na_cutanje/iz:nije_postupio_u_zakonskom_roku + /iz:izvestaj/iz:podaci_o_zalbama/iz:broj_zalbi_na_odluku = 0">
										/
									</xsl:when>
									<xsl:otherwise>
										<xsl:value-of select="format-number((/iz:izvestaj/iz:podaci_o_zalbama/iz:zalbe_na_cutanje/iz:nije_postupio_u_celosti div (/iz:izvestaj/iz:podaci_o_zalbama/iz:zalbe_na_cutanje/iz:nije_postupio + /iz:izvestaj/iz:podaci_o_zalbama/iz:zalbe_na_cutanje/iz:nije_postupio_u_celosti + /iz:izvestaj/iz:podaci_o_zalbama/iz:zalbe_na_cutanje/iz:nije_postupio_u_zakonskom_roku + /iz:izvestaj/iz:podaci_o_zalbama/iz:broj_zalbi_na_odluku))*100, '#.00')"></xsl:value-of>
									</xsl:otherwise>
								</xsl:choose>
					    	</td>
					    	<td style="border: 1px solid black; border-collapse: collapse; text-align: justify; font-family: serif; font-size: 11pt; font-family: 'Times New Roman'; padding: 5px; text-align: left; padding-left: 7px;">
					    		<xsl:choose>
					    			<xsl:when
										test="/iz:izvestaj/iz:podaci_o_zalbama/iz:zalbe_na_cutanje/iz:nije_postupio_u_zakonskom_roku = 0">
										/
									</xsl:when>
									<xsl:when
										test="/iz:izvestaj/iz:podaci_o_zalbama/iz:zalbe_na_cutanje/iz:nije_postupio + /iz:izvestaj/iz:podaci_o_zalbama/iz:zalbe_na_cutanje/iz:nije_postupio_u_celosti + /iz:izvestaj/iz:podaci_o_zalbama/iz:zalbe_na_cutanje/iz:nije_postupio_u_zakonskom_roku + /iz:izvestaj/iz:podaci_o_zalbama/iz:broj_zalbi_na_odluku = 0">
										/
									</xsl:when>
									<xsl:otherwise>
										<xsl:value-of select="format-number((/iz:izvestaj/iz:podaci_o_zalbama/iz:zalbe_na_cutanje/iz:nije_postupio_u_zakonskom_roku div (/iz:izvestaj/iz:podaci_o_zalbama/iz:zalbe_na_cutanje/iz:nije_postupio + /iz:izvestaj/iz:podaci_o_zalbama/iz:zalbe_na_cutanje/iz:nije_postupio_u_celosti + /iz:izvestaj/iz:podaci_o_zalbama/iz:zalbe_na_cutanje/iz:nije_postupio_u_zakonskom_roku + /iz:izvestaj/iz:podaci_o_zalbama/iz:broj_zalbi_na_odluku))*100, '#.00')"></xsl:value-of>
									</xsl:otherwise>
								</xsl:choose>
					    	</td>
					    	<td style="border: 1px solid black; border-collapse: collapse; text-align: justify; font-family: serif; font-size: 11pt; font-family: 'Times New Roman'; padding: 5px; text-align: left; padding-left: 7px;">
					    		<xsl:choose>
					    			<xsl:when
										test="/iz:izvestaj/iz:podaci_o_zalbama/iz:broj_zalbi_na_odluku = 0">
										/
									</xsl:when>
									<xsl:when
										test="/iz:izvestaj/iz:podaci_o_zalbama/iz:zalbe_na_cutanje/iz:nije_postupio + /iz:izvestaj/iz:podaci_o_zalbama/iz:zalbe_na_cutanje/iz:nije_postupio_u_celosti + /iz:izvestaj/iz:podaci_o_zalbama/iz:zalbe_na_cutanje/iz:nije_postupio_u_zakonskom_roku + /iz:izvestaj/iz:podaci_o_zalbama/iz:broj_zalbi_na_odluku = 0">
										/
									</xsl:when>
									<xsl:otherwise>
										<xsl:value-of select="format-number((/iz:izvestaj/iz:podaci_o_zalbama/iz:broj_zalbi_na_odluku div (/iz:izvestaj/iz:podaci_o_zalbama/iz:zalbe_na_cutanje/iz:nije_postupio + /iz:izvestaj/iz:podaci_o_zalbama/iz:zalbe_na_cutanje/iz:nije_postupio_u_celosti + /iz:izvestaj/iz:podaci_o_zalbama/iz:zalbe_na_cutanje/iz:nije_postupio_u_zakonskom_roku + /iz:izvestaj/iz:podaci_o_zalbama/iz:broj_zalbi_na_odluku))*100, '#.00')"></xsl:value-of>
									</xsl:otherwise>
								</xsl:choose>
					    	</td>
					  	</tr>
					</table>
		            <p style="text-indent: 0pt; margin-top: 50pt; margin-bottom: 30pt; font-size: 11pt; font-family: 'Times New Roman';">Извештај је састављен на основу података из периода 
							01.01.<xsl:value-of select="format-date($currenttime,'[Y]')" />. до 
						<xsl:if
							test="number(format-date($currenttime,'[D]')) gt 9">
							<xsl:value-of
								select="format-date($currenttime,'[D]')" />
						</xsl:if>
						<xsl:if
							test="number(format-date($currenttime,'[D]')) lt 10">
							<xsl:text>0</xsl:text>
							<xsl:value-of
								select="format-date($currenttime,'[D]')" />
						</xsl:if>
						<xsl:text>.</xsl:text>
						<xsl:if
							test="number(format-date($currenttime,'[M]')) gt 9">
							<xsl:value-of
								select="format-date($currenttime,'[M]')" />
						</xsl:if>
						<xsl:if
							test="number(format-date($currenttime,'[M]')) lt 10">
							<xsl:text>0</xsl:text>
							<xsl:value-of
								select="format-date($currenttime,'[M]')" />
						</xsl:if>
						<xsl:text>.</xsl:text>
						<xsl:value-of
							select="format-date($currenttime,'[Y]')" />.
		            </p>
		        </div>
		    </body>
		</html>
	</xsl:template>
</xsl:stylesheet>