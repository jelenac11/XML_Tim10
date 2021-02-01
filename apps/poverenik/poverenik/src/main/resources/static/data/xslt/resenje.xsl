<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet
	xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
	xmlns:res="http://www.projekat.org/resenje"
	xmlns:common="http://www.projekat.org/common"
	xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	xmlns:xs="http://www.w3.org/2001/XMLSchema" version="2.0">
	<xsl:template match="/">
		<html>
			<head>
				<style>
					body {
					background-color: grey;
					}
					
					.font_style {
						font-family:Times,serif;
						font-size:12px;
						color:rgb(0,0,0);
						font-weight:normal;
						font-style:normal;
						text-decoration: none;
						background-color: white;
					}
				</style>
			</head>
			<body>
				<div class="font_style" style="text-align:justify;position:absolute;left:50%;margin-left:-306px;top:0px;width:612px;border-style:outset;overflow:hidden;padding: 35px;">
					<p style="white-space: pre-line;">Решење када је жалба основана - налаже се:
						Бр. <xsl:value-of select="/res:odluka_poverioca/@broj_rešenja"/> <span style="float: right">Датум: <xsl:variable name="currenttime"
							select="/res:odluka_poverioca/res:datum_rešenja" as="xs:date" /><xsl:if
								test="number(format-date($currenttime,'[D]')) gt 9"><xsl:value-of
									select="format-date($currenttime,'[D]')" />
							</xsl:if><xsl:if
								test="number(format-date($currenttime,'[D]')) lt 10"><xsl:text>0</xsl:text><xsl:value-of
									select="format-date($currenttime,'[D]')" />
							</xsl:if><xsl:text>.</xsl:text><xsl:if
							test="number(format-date($currenttime,'[M]')) gt 9"><xsl:value-of
								select="format-date($currenttime,'[M]')" />
						</xsl:if><xsl:if
							test="number(format-date($currenttime,'[M]')) lt 10"><xsl:text>0</xsl:text><xsl:value-of
								select="format-date($currenttime,'[M]')" />
						</xsl:if><xsl:text>.</xsl:text><xsl:value-of
							select="format-date($currenttime,'[Y]')" /> године.</span></p>
					<p>
						<xsl:apply-templates select="/res:odluka_poverioca/res:opis_žalbe/res:ceo_opis/res:paragraf"/>
					</p>
					<p style="text-align:center">Р Е Ш Е Њ Е</p>
					<xsl:for-each select="/res:odluka_poverioca/res:rešenja/res:paragraf">
						<p style="text-indent: 30px">
							<xsl:apply-templates />
						</p>
					</xsl:for-each>
					<p style="text-align:center">О б р а з л о ж е њ е</p>
					<xsl:for-each select="/res:odluka_poverioca/res:obrazloženje/res:opis/res:paragraf">
						<p style="text-indent: 30px">
							<xsl:apply-templates />
						</p>
					</xsl:for-each>
					<xsl:for-each select="/res:odluka_poverioca/res:obrazloženje/res:razlog/res:paragraf">
						<p style="text-indent: 30px">
							<xsl:apply-templates />
						</p>
					</xsl:for-each>
					<xsl:for-each select="/res:odluka_poverioca/res:obrazloženje/res:konačno_rešenje/res:paragraf">
						<p style="text-indent: 30px">
							<xsl:apply-templates />
						</p>
					</xsl:for-each>
					<p>
						<xsl:value-of select="/res:odluka_poverioca/res:uputstvo"/>
					</p>
					<p style="white-space: pre-line; text-align: right;">ПОВЕРЕНИК 
						<xsl:value-of select="/res:odluka_poverioca/res:poverenik/common:ime"/>&#160;<xsl:value-of select="/res:odluka_poverioca/res:poverenik/common:prezime"/>
					</p>
				</div>
				
			</body>
		</html>
	</xsl:template>
	<xsl:template match="res:paragraf">
			<xsl:apply-templates />
	</xsl:template>
	<xsl:template match="res:paragraf//*">
		<xsl:copy>
			<xsl:copy-of select="@*" />
			<xsl:apply-templates />
		</xsl:copy>
	</xsl:template>
	
	<xsl:template match="res:paragraf//res:datum">
		<xsl:variable name="currenttime"
			select="." as="xs:date" />
		<xsl:if
			test="number(format-date($currenttime,'[D]')) gt 9"><xsl:value-of
				select="format-date($currenttime,'[D]')" />
		</xsl:if><xsl:if
			test="number(format-date($currenttime,'[D]')) lt 10"><xsl:text>0</xsl:text><xsl:value-of
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
			select="format-date($currenttime,'[Y]')" />
	</xsl:template>
	
	<xsl:template match="res:paragraf//res:zakon">
		<xsl:copy-of select="." />
	</xsl:template>
	
	<!-- default rule: ignore any unspecific text node -->
	<xsl:template match="text()" />
	
	<!-- override rule: copy any text node beneath description -->
	<xsl:template match="res:paragraf//text()">
		<xsl:copy-of select="." />
	</xsl:template>
</xsl:stylesheet>