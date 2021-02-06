<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet
	xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
	xmlns:fo="http://www.w3.org/1999/XSL/Format"
	xmlns:res="http://www.projekat.org/resenje"
	xmlns:common="http://www.projekat.org/common"
	xmlns:xs="http://www.w3.org/2001/XMLSchema" version="2.0">

	<xsl:template match="/">
		<fo:root>
			<fo:layout-master-set>
				<fo:simple-page-master
					master-name="bookstore-page">
					<fo:region-body margin-top="0.75in"
						margin-bottom="0.75in" margin-left="80pt" margin-right="80pt" />
				</fo:simple-page-master>
			</fo:layout-master-set>

			<fo:page-sequence master-reference="bookstore-page">
				<fo:flow flow-name="xsl-region-body">
					<fo:block font-family="Times New Roman" font-size="12px" >
						<fo:block>Решење када је жалба основана - налаже се:</fo:block>
						Бр. <xsl:value-of select="/res:odluka_poverioca/@broj_rešenja"></xsl:value-of>
						<fo:block text-align="right">Датум: <xsl:variable name="currenttime"
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
							select="format-date($currenttime,'[Y]')" /> године.</fo:block>
					</fo:block>
					<fo:block padding="10px"/>
					<fo:block text-align="justify" font-family="Times New Roman" font-size="12px">
						<xsl:apply-templates select="/res:odluka_poverioca/res:opis_žalbe/res:ceo_opis/res:paragraf"/>
					</fo:block>
					<fo:block padding="10px"/>
					<fo:block text-align="center" font-family="Times New Roman" font-size="12px">
						Р Е Ш Е Њ Е
					</fo:block>
					
					<xsl:for-each select="/res:odluka_poverioca/res:rešenja/res:paragraf">
						<fo:block text-align="justify" text-indent="4em" font-family="Times New Roman" font-size="12px" >
							<xsl:apply-templates />
						</fo:block>
					</xsl:for-each>
					<fo:block padding="10px"/>
					<fo:block text-align="center" font-family="Times New Roman" font-size="12px">
						О б р а з л о ж е њ е
					</fo:block>
					<xsl:for-each select="/res:odluka_poverioca/res:obrazloženje/res:opis/res:paragraf">
						<fo:block   text-align="justify" text-indent="4em" font-family="Times New Roman" font-size="12px">
							<xsl:apply-templates />
						</fo:block>
					</xsl:for-each>
					<xsl:for-each select="/res:odluka_poverioca/res:obrazloženje/res:razlog/res:paragraf">
						<fo:block text-align="justify" text-indent="4em" font-family="Times New Roman" font-size="12px">
							<xsl:apply-templates />
						</fo:block>
					</xsl:for-each>
					<xsl:for-each select="/res:odluka_poverioca/res:obrazloženje/res:konačno_rešenje/res:paragraf">
						<fo:block text-align="justify" text-indent="4em" font-family="Times New Roman" font-size="12px">
							<xsl:apply-templates />
						</fo:block>
					</xsl:for-each>
					<fo:block text-align="justify" font-family="Times New Roman" font-size="12px" >
						<xsl:apply-templates select="/res:odluka_poverioca/res:uputstvo"/>
					</fo:block>
					<fo:block padding="10px"/>
					<fo:block text-align="right" font-family="Times New Roman" font-size="12px" >
						<fo:block font-family="Times New Roman" font-size="12px" >
							ПОВЕРЕНИК
						</fo:block>
						<fo:block font-family="Times New Roman" font-size="12px" >
							<xsl:value-of select="/res:odluka_poverioca/res:poverenik/common:ime"/>&#160;<xsl:value-of select="/res:odluka_poverioca/res:poverenik/common:prezime"/>
						</fo:block>
					</fo:block>
				</fo:flow>
			</fo:page-sequence>
		</fo:root>
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
	
	<xsl:template match="res:paragraf//res:zakon">
		<xsl:copy-of select="text()" />
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
	
	
	
	<!-- default rule: ignore any unspecific text node -->
	<xsl:template match="text()" />
	
	<!-- override rule: copy any text node beneath description -->
	<xsl:template match="res:paragraf//text()">
		<xsl:copy-of select="." />
	</xsl:template>
</xsl:stylesheet>