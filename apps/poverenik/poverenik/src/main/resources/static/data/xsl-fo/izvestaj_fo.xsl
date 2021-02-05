<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" 
	xmlns:fo="http://www.w3.org/1999/XSL/Format"
    xmlns:iz="http://www.projekat.org/izvestaj"
    xmlns:xs="http://www.w3.org/2001/XMLSchema"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    version="2.0">
    <xsl:attribute-set name="colspan-3">
			    <xsl:attribute name="number-columns-spanned">3</xsl:attribute>
			</xsl:attribute-set>
			<xsl:attribute-set name="rowspan-2">
			    <xsl:attribute name="number-rows-spanned">2</xsl:attribute>
			</xsl:attribute-set>
	<xsl:attribute-set name="myBorder">
  <xsl:attribute name="border">solid 0.4mm black</xsl:attribute>
 
</xsl:attribute-set>
   <xsl:template match="/">
   	<xsl:variable name="currenttime"
							select="/iz:izvestaj/iz:datum_podnosenja" as="xs:date" />
		<fo:root>
			<fo:layout-master-set>
				<fo:simple-page-master
					master-name="bookstore-page">
					<fo:region-body margin-top="1in"
						margin-bottom="1in" margin-left="70pt" margin-right="70pt" />
				</fo:simple-page-master>
			</fo:layout-master-set>
			
			<fo:page-sequence master-reference="bookstore-page">
				
				<fo:flow flow-name="xsl-region-body">
					<fo:block font-family="Times New Roman" margin-top="0pt" margin-bottom="30pt" font-size="12pt" text-align="center" font-weight="bold">
						Примена Закона о слободном приступу информацијама од јавног значаја у <xsl:value-of select="format-date($currenttime,'[Y]')" />. години
					</fo:block>
					<fo:block font-family="Times New Roman" text-align="left"
						font-size="11pt" font-weight="bold" margin-top="50pt">
						1. Захтеви
					</fo:block>
					<fo:table font-family="Times New Roman" text-align="left"
						font-size="11pt" font-weight="bold" margin-top="25pt">
						<fo:table-header>
						  <fo:table-row>
						    <fo:table-cell xsl:use-attribute-sets="myBorder">
						      <fo:block></fo:block>
						    </fo:table-cell>
						    <fo:table-cell xsl:use-attribute-sets="myBorder">
						      <fo:block>Усвојени захтеви</fo:block>
						    </fo:table-cell>
						    <fo:table-cell xsl:use-attribute-sets="myBorder">
						      <fo:block>Одбијени захтеви</fo:block>
						    </fo:table-cell>
						    <fo:table-cell xsl:use-attribute-sets="myBorder">
						      <fo:block>Захтеви на које није одговорено</fo:block>
						    </fo:table-cell>
						    <fo:table-cell xsl:use-attribute-sets="myBorder">
						      <fo:block>Укупно</fo:block>
						    </fo:table-cell>
						  </fo:table-row>
						</fo:table-header>
						<fo:table-body>
						  <fo:table-row>
						    <fo:table-cell xsl:use-attribute-sets="myBorder">
						      <fo:block>Број захтева</fo:block>
						    </fo:table-cell>
						    <fo:table-cell xsl:use-attribute-sets="myBorder">
						      <fo:block>
						      	<xsl:choose>
									<xsl:when
										test="/iz:izvestaj/iz:podaci_o_zahtevima/iz:broj_usvojenih_zahteva = 0">
										/
									</xsl:when>
									<xsl:otherwise>
										<xsl:value-of select="/iz:izvestaj/iz:podaci_o_zahtevima/iz:broj_usvojenih_zahteva"></xsl:value-of>
									</xsl:otherwise>
								</xsl:choose>
						      </fo:block>
						    </fo:table-cell>
						    <fo:table-cell xsl:use-attribute-sets="myBorder">
						      <fo:block>
						      	<xsl:choose>
									<xsl:when
										test="/iz:izvestaj/iz:podaci_o_zahtevima/iz:broj_odbijenih_zahteva = 0">
										/
									</xsl:when>
									<xsl:otherwise>
										<xsl:value-of select="/iz:izvestaj/iz:podaci_o_zahtevima/iz:broj_odbijenih_zahteva"></xsl:value-of>
									</xsl:otherwise>
								</xsl:choose>
						      </fo:block>
						    </fo:table-cell>
						    <fo:table-cell xsl:use-attribute-sets="myBorder">
						      <fo:block>
						      	<xsl:choose>
									<xsl:when
										test="/iz:izvestaj/iz:podaci_o_zahtevima/iz:broj_zahteva_na_koje_nije_odgovoreno = 0">
										/
									</xsl:when>
									<xsl:otherwise>
										<xsl:value-of select="/iz:izvestaj/iz:podaci_o_zahtevima/iz:broj_zahteva_na_koje_nije_odgovoreno"></xsl:value-of>
									</xsl:otherwise>
								</xsl:choose>
						      </fo:block>
						    </fo:table-cell>
						    <fo:table-cell xsl:use-attribute-sets="myBorder">
						      <fo:block>
						      	<xsl:choose>
						      		<xsl:when
										test="/iz:izvestaj/iz:podaci_o_zahtevima/iz:broj_usvojenih_zahteva + /iz:izvestaj/iz:podaci_o_zahtevima/iz:broj_odbijenih_zahteva + /iz:izvestaj/iz:podaci_o_zahtevima/iz:broj_zahteva_na_koje_nije_odgovoreno = 0">
										/
									</xsl:when>
									<xsl:otherwise>
										<xsl:value-of select="/iz:izvestaj/iz:podaci_o_zahtevima/iz:broj_usvojenih_zahteva + /iz:izvestaj/iz:podaci_o_zahtevima/iz:broj_odbijenih_zahteva + /iz:izvestaj/iz:podaci_o_zahtevima/iz:broj_zahteva_na_koje_nije_odgovoreno"></xsl:value-of>
									</xsl:otherwise>
								</xsl:choose>
						      </fo:block>
						    </fo:table-cell>
						  </fo:table-row>
						  <fo:table-row>
						    <fo:table-cell xsl:use-attribute-sets="myBorder">
						      <fo:block>%</fo:block>
						    </fo:table-cell>
						    <fo:table-cell xsl:use-attribute-sets="myBorder">
						      <fo:block>
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
						      </fo:block>
						    </fo:table-cell>
						    <fo:table-cell xsl:use-attribute-sets="myBorder">
						      <fo:block>
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
						      </fo:block>
						    </fo:table-cell>
						    <fo:table-cell xsl:use-attribute-sets="myBorder">
						      <fo:block>
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
						      </fo:block>
						    </fo:table-cell>
						  </fo:table-row>
						</fo:table-body>
					</fo:table>
					<fo:block font-family="Times New Roman" text-align="left"
						font-size="11pt" font-weight="bold" margin-top="50pt">
						2. Жалбе
					</fo:block>
					<fo:table font-family="Times New Roman" text-align="left"
						font-size="11pt" font-weight="bold" margin-top="25pt">
						<fo:table-header>
						  <fo:table-row>
						    <fo:table-cell xsl:use-attribute-sets="myBorder">
						      <fo:block></fo:block>
						    </fo:table-cell>
						    <fo:table-cell xsl:use-attribute-sets="colspan-3 myBorder">
						      <fo:block>Жалбе на ћутање</fo:block>
						    </fo:table-cell>
						    <fo:table-cell xsl:use-attribute-sets="rowspan-2 myBorder">
						      <fo:block>Жалбе на одлуку</fo:block>
						    </fo:table-cell>
						    <fo:table-cell xsl:use-attribute-sets="rowspan-2 myBorder">
						      <fo:block>Укупно</fo:block>
						    </fo:table-cell>
						  </fo:table-row>
						  <fo:table-row>
						    <fo:table-cell xsl:use-attribute-sets="myBorder">
						      <fo:block></fo:block>
						    </fo:table-cell>
						    <fo:table-cell xsl:use-attribute-sets="myBorder">
						      <fo:block>Није поступио</fo:block>
						    </fo:table-cell>
						    <fo:table-cell xsl:use-attribute-sets="myBorder">
						      <fo:block>Није поступио у целости</fo:block>
						    </fo:table-cell>
						    <fo:table-cell xsl:use-attribute-sets="myBorder">
						      <fo:block>Није поступио у законском року</fo:block>
						    </fo:table-cell>
						  </fo:table-row>
						</fo:table-header>
						<fo:table-body>
						  <fo:table-row>
						    <fo:table-cell xsl:use-attribute-sets="myBorder">
						      <fo:block>Број жалби</fo:block>
						    </fo:table-cell>
						    <fo:table-cell xsl:use-attribute-sets="myBorder">
						      <fo:block>
						      	<xsl:choose>
									<xsl:when
										test="/iz:izvestaj/iz:podaci_o_zalbama/iz:zalbe_na_cutanje/iz:nije_postupio = 0">
										/
									</xsl:when>
									<xsl:otherwise>
										<xsl:value-of select="/iz:izvestaj/iz:podaci_o_zalbama/iz:zalbe_na_cutanje/iz:nije_postupio"></xsl:value-of>
									</xsl:otherwise>
								</xsl:choose>
						      </fo:block>
						    </fo:table-cell>
						    <fo:table-cell xsl:use-attribute-sets="myBorder">
						      <fo:block>
						      	<xsl:choose>
									<xsl:when
										test="/iz:izvestaj/iz:podaci_o_zalbama/iz:zalbe_na_cutanje/iz:nije_postupio_u_celosti = 0">
										/
									</xsl:when>
									<xsl:otherwise>
										<xsl:value-of select="/iz:izvestaj/iz:podaci_o_zalbama/iz:zalbe_na_cutanje/iz:nije_postupio_u_celosti"></xsl:value-of>
									</xsl:otherwise>
								</xsl:choose>
						      </fo:block>
						    </fo:table-cell>
						    <fo:table-cell xsl:use-attribute-sets="myBorder">
						      <fo:block>
						      	<xsl:choose>
									<xsl:when
										test="/iz:izvestaj/iz:podaci_o_zalbama/iz:zalbe_na_cutanje/iz:nije_postupio_u_zakonskom_roku = 0">
										/
									</xsl:when>
									<xsl:otherwise>
										<xsl:value-of select="/iz:izvestaj/iz:podaci_o_zalbama/iz:zalbe_na_cutanje/iz:nije_postupio_u_zakonskom_roku"></xsl:value-of>
									</xsl:otherwise>
								</xsl:choose>
						      </fo:block>
						    </fo:table-cell>
						    <fo:table-cell xsl:use-attribute-sets="myBorder">
						      <fo:block>
						      	<xsl:choose>
									<xsl:when
										test="/iz:izvestaj/iz:podaci_o_zalbama/iz:broj_zalbi_na_odluku = 0">
										/
									</xsl:when>
									<xsl:otherwise>
										<xsl:value-of select="/iz:izvestaj/iz:podaci_o_zalbama/iz:broj_zalbi_na_odluku"></xsl:value-of>
									</xsl:otherwise>
								</xsl:choose>
						      </fo:block>
						    </fo:table-cell>
						    <fo:table-cell xsl:use-attribute-sets="myBorder">
						      <fo:block>
						      	<xsl:choose>
									<xsl:when
										test="/iz:izvestaj/iz:podaci_o_zalbama/iz:zalbe_na_cutanje/iz:nije_postupio + /iz:izvestaj/iz:podaci_o_zalbama/iz:zalbe_na_cutanje/iz:nije_postupio_u_celosti + /iz:izvestaj/iz:podaci_o_zalbama/iz:zalbe_na_cutanje/iz:nije_postupio_u_zakonskom_roku + /iz:izvestaj/iz:podaci_o_zalbama/iz:broj_zalbi_na_odluku = 0">
										/
									</xsl:when>
									<xsl:otherwise>
										<xsl:value-of select="/iz:izvestaj/iz:podaci_o_zalbama/iz:zalbe_na_cutanje/iz:nije_postupio + /iz:izvestaj/iz:podaci_o_zalbama/iz:zalbe_na_cutanje/iz:nije_postupio_u_celosti + /iz:izvestaj/iz:podaci_o_zalbama/iz:zalbe_na_cutanje/iz:nije_postupio_u_zakonskom_roku + /iz:izvestaj/iz:podaci_o_zalbama/iz:broj_zalbi_na_odluku"></xsl:value-of>
									</xsl:otherwise>
								</xsl:choose>
						      </fo:block>
						    </fo:table-cell>
						  </fo:table-row>
						  <fo:table-row>
						    <fo:table-cell xsl:use-attribute-sets="myBorder">
						      <fo:block>%</fo:block>
						    </fo:table-cell>
						    <fo:table-cell xsl:use-attribute-sets="myBorder">
						      <fo:block>
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
						      </fo:block>
						    </fo:table-cell>
						    <fo:table-cell xsl:use-attribute-sets="myBorder">
						      <fo:block>
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
						      </fo:block>
						    </fo:table-cell>
						    <fo:table-cell xsl:use-attribute-sets="myBorder">
						      <fo:block>
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
						      </fo:block>
						    </fo:table-cell>
						    <fo:table-cell xsl:use-attribute-sets="myBorder">
						      <fo:block>
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
						      </fo:block>
						    </fo:table-cell>
						  </fo:table-row>
						</fo:table-body>
					</fo:table>
					<fo:block font-family="Times New Roman" text-align="left"
						font-size="11pt" margin-top="40pt" margin-bottom="30pt">
						Извештај је састављен на основу података из периода 01.01.<xsl:value-of select="format-date($currenttime,'[Y]')" />. до 
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
					</fo:block>
				</fo:flow>
			</fo:page-sequence>
		</fo:root>
	</xsl:template>
</xsl:stylesheet>